import { getPortfolioList } from '../../../apis/Fetcher';
import { getIsNew } from '../../../utils/getIsNew';
import { useState, useEffect } from 'react';
import styles from './HotPortfolio.module.scss';
import { TypePortfolioList } from '../../../interfaces/Portfolio.interface';

export default function HotPortfolio() {
  const [portfolioList, setPortfolioList] = useState<TypePortfolioList[]>([]);
  const getPortfolioListData = async (): Promise<void> => {
    try {
      const response = await getPortfolioList(1);
      //@ts-ignore
      setPortfolioList(response.pagenatedPortfolios);
    } catch (error: any) {
      if (error.message === '404') {
        setPortfolioList([]);
      }
    }
  };
  useEffect(() => {
    getPortfolioListData();
  }, []);
  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  useEffect(() => {
    setMove(() => ({ transform: `translateX(${currentId * -100}%)` }));
  }, [currentId]);

  const totalItems = portfolioList.length / 3;

  const handleBack = () => {
    setCurrentId((curr) => (curr === 0 ? totalItems - 1 : curr - 1));
  };

  const handleNext = () => {
    setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
  };

  return (
    <div className={styles.HotPortfolio}>
      <h1>인기 포트폴리오🎉</h1>
      <p>인기 포트폴리오 자랑글을 확인해보세요!</p>
      <button>모두 보기</button>
      <div className={styles.slideArea}>
        <button onClick={handleBack}>◀️</button>
        <span>{currentId + 1}</span>
        <button onClick={handleNext}>▶️</button>

        <div className={styles.portfolioList} style={move}>
          {portfolioList.map((portfolio) => (
            <div key={portfolio.portfolio_id} className={styles.portfolioContainer}>
              <div className={styles.portfolio}>
                {/* @ts-ignore */}
                <img
                  src={
                    portfolio.img ||
                    'https://i0.wp.com/sciencefestival.kr/wp-content/uploads/2023/02/placeholder.png?ssl=1'
                  }
                  alt="포트폴리오 썸네일"
                />
                <h1>{portfolio.title}</h1>
                <h3>{portfolio.summary}</h3>
                <p>{portfolio.stack.stackList}</p>
                <span>👀{portfolio.views}</span>
                <span>💬{portfolio.comments}</span>
                <span>📌{portfolio.bookmarks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
