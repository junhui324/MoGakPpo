import React, { useState, useEffect } from 'react';

// component
import PortfolioCell from './PortfolioCell';

// Fetcher
import * as Fetcher from '../../apis/Fetcher';

// 타입
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';

// 스타일
import styles from './PortfolioListWrap.module.scss';

// 상수
const INITIAL_PAGE = 1;

function PortfolioListWrap() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [data, setData] = useState<TypePortfolioList[] | null>(null);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [maxPage, setMaxPage] = useState<number>(INITIAL_PAGE);

  const fetchData = async () => {
    try {
      // 데이터를 불러와서 저장합니다.
      console.log('page', page);

      const data = await Fetcher.getPortfolioList(page);

      // 데이터에 맞게 페이지 최대 사이즈와 데이터를 설정합니다.
      setMaxPage(data.pageSize);
      setData((prev) => {
        if (prev) return [...prev, ...data.pagenatedPortfolios];
        return data.pagenatedPortfolios;
      });
    } catch (error) {
      console.log(error);
    } finally {
      // 로딩 완료
      setIsLoading(false);
      // 현재 페이지를 설정합니다.
      setPage((prev) => prev + 1);
    }
  };

  // 페이지에 따라 데이터 로딩 (여러 번 호출되는 경우 있으면 안됨)
  useEffect(() => {
    setIsLoading(true);
    fetchData();

    return () => {
      setIsNext(false);
    };
  }, [isNext]);

  return (
    <div className={styles.container}>
      {/* 로딩이 끝나면 실제로 화면에 표시 */}
      {!isLoading &&
        (data ? (
          data.map((portfolio) => {
            return (
              <PortfolioCell key={portfolio.portfolio_id} isLoading={false} portfolio={portfolio} />
            );
          })
        ) : (
          <p>'포스트없음'</p>
        ))}
      {/* 로딩 중일때는 현재 내용에 로딩중 컴포넌트를 붙입니다. */}
      {isLoading && <PortfolioCell isLoading={true} portfolio={null} />}
    </div>
  );
}

export default PortfolioListWrap;
