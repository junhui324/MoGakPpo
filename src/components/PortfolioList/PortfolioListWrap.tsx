import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import debounce from '../../utils/debounce';

// component
import PortfolioCell from './PortfolioCell';

// Fetcher
import * as Fetcher from '../../apis/Fetcher';

// 타입
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';

// 스타일
import styles from './PortfolioListWrap.module.scss';
import Loading from '../common/Loading/Loading';

// 상수
const INITIAL_PAGE = 1;
const DEBOUNCING = 100;

function PortfolioListWrap({ keyword }: { keyword: string }) {
  // 상태관리
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [data, setData] = useState<TypePortfolioList[] | null>(null);
  const [totalPage, setTotalPage] = useState<number>(INITIAL_PAGE);
  const page = useRef<number>(INITIAL_PAGE);

  const fetchData = async () => {
    // 로딩중 상태를 true로 변경합니다.
    setIsLoading(true);

    try {
      const data = await Fetcher.getPortfolioList(page.current, keyword, false);
      console.log(data);

      // 데이터에 맞게 페이지 최대 사이즈와 데이터를 설정합니다.
      setTotalPage(data.pageSize);
      setData((prev) => {
        if (prev) return [...prev, ...data.pagenatedPortfolios];
        return data.pagenatedPortfolios;
      });

      // 페이지 위치 증가
      page.current++;
    } catch (error) {
      console.log(error);
      if (!data) return;
    } finally {
      // 로딩 완료
      setIsLoading(false);
    }
  };

  // Intersection Oberserver API
  let observerRef = useRef<IntersectionObserver | null>(null); // 옵저버
  const targetRef = useRef<HTMLDivElement>(null); // 옵저버 엔트리
  const options = useMemo(() => {
    // 상태와 관련된 값이기 때문에 useMemo 사용
    return {
      // 기본 root인 사용자 뷰포트로 관찰
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };
  }, []);

  // 상태와 관련된 값을 이용하는 함수를 반환하므로 useCallback사용
  const infiniteScroll = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // target을 교차했을 때
      if (entries[0].isIntersecting) {
        data && !isLoading && page.current <= totalPage && fetchData();
      }
    },
    [data, fetchData, totalPage, isLoading]
  );

  const keywordSearch = () => {
    // 키워드가 입력되면 모든 결과를 초기화합니다.
    setData(null);
    setTotalPage(INITIAL_PAGE);
    page.current = INITIAL_PAGE;

    fetchData();
  };

  // 초기 로딩을 포함합니다.
  useEffect(() => {
    keywordSearch();
  }, [keyword]);

  // 상태가 변할때, 메모이제이션을 통한 값들이 변하면 observer 갱신
  useEffect(() => {
    // 새로운 옵저버 생성. totalPage 값을 갱신해주기 위함.
    // 너무 빠른 target 인식을 피하기 위해 디바운싱 진행.
    observerRef.current = new IntersectionObserver(debounce(infiniteScroll, DEBOUNCING), options);
    // 옵저버 등록
    targetRef.current && observerRef.current.observe(targetRef.current);

    return () => {
      // 갱신할 때 기존 observer를 disconnet함
      observerRef.current && observerRef.current.disconnect();
    };
  }, [infiniteScroll, options]);

  return (
    <>
      <div className={styles.container}>
        {/* 로딩되어있는 데이터 표시 */}
        {data && data.length > 0
          ? data.map((portfolio) => {
              return <PortfolioCell key={portfolio.portfolio_id} portfolio={portfolio} />;
            })
          : !isLoading && (
              <p className={styles.noContent}>
                <span className={styles.noneContent}>포스트가 없네요 :|</span>
              </p>
            )}
      </div>
      {/* 로딩 중일때는 현재 내용에 로딩중 컴포넌트를 붙입니다. */}
      {isLoading && <Loading />}
      <div className={styles.observer} ref={targetRef}></div>
    </>
  );
}

export default PortfolioListWrap;
