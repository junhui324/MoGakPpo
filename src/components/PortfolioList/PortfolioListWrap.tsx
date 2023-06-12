import React, { useState, useEffect, useRef } from 'react';
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

  // Intersection Oberserver API
  const targetRef = useRef<HTMLDivElement>(null); // 옵저버 엔트리
  const options = {
    // 기본 root인 사용자 뷰포트로 관찰
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  };
  const infiniteScroll = (entries: IntersectionObserverEntry[]) => {
    // target을 교차했을 때
    if (entries[0].isIntersecting) {
      !isLoading && page.current <= totalPage && fetchData();
    }
  };
  let observer: IntersectionObserver;

  const fetchData = async () => {
    // 로딩중 상태를 true로 변경합니다.
    setIsLoading(true);

    try {
      const data = await Fetcher.getPortfolioList(page.current, keyword, false);

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
    } finally {
      // 로딩 완료
      setIsLoading(false);
    }
  };

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

  // totalPage가 갱신될때마다 observer 갱신
  useEffect(() => {
    // 새로운 옵저버 생성. totalPage 값을 갱신해주기 위함.
    // 너무 빠른 target 인식을 피하기 위해 디바운싱 진행.
    observer = new IntersectionObserver(debounce(infiniteScroll, DEBOUNCING), options);
    // 옵저버 등록
    targetRef.current && observer.observe(targetRef.current);

    return () => {
      // 갱신할 때 기존 observer를 disconnet함
      observer.disconnect();
    };
  }, [totalPage]);

  return (
    <>
      <div className={styles.container}>
        {/* 로딩되어있는 데이터 표시 */}
        {data
          ? data.map((portfolio) => {
              return <PortfolioCell key={portfolio.portfolio_id} portfolio={portfolio} />;
            })
          : !isLoading && <p>'포스트없음'</p>}
      </div>
      {/* 로딩 중일때는 현재 내용에 로딩중 컴포넌트를 붙입니다. */}
      {isLoading && <Loading />}
      <div className={styles.observer} ref={targetRef}></div>
    </>
  );
}

export default PortfolioListWrap;
