import { getPortfolioList } from '../../../apis/Fetcher';
import { useNavigate } from 'react-router-dom';
import { getIsNew } from '../../../utils/getIsNew';
import { useState, useEffect } from 'react';
import styles from './HotPortfolio.module.scss';
import { TypePortfolioList } from '../../../interfaces/Portfolio.interface';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ROUTES from '../../../constants/Routes';

export default function HotPortfolio() {
  const navigate = useNavigate();

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
      <div className={styles.titleContainer}>
        <div className={styles.titleTextWrapper}>
          <h1>인기 포트폴리오</h1>
          <p>인기 포트폴리오 자랑글을 확인해보세요!</p>
        </div>
        <button onClick={() => navigate(`${ROUTES.PORTFOLIO_LIST}`)}>모두 보기</button>
      </div>
      <div className={styles.slideArea}>

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
                <div className={styles.contentWrapper}>
                  <h1 className={styles.title}>{portfolio.title}</h1>
                  <h3 className={styles.summary}>{portfolio.summary}</h3>
                  <div className={styles.stack}>
                    {portfolio.stack.stackList?.map((stack, index) => (
                      <p key={`${stack}-${index}`}>{stack}</p>
                    ))}
                  </div>
                  <div className={styles.viewWrapper}>
                    <span>👀</span>
                    <span className={styles.count}>{portfolio.views}</span>
                    <span>💬</span>
                    <span className={styles.count}>{portfolio.comments}</span>
                    <span>📌</span>
                    <span className={styles.count}>{portfolio.bookmarks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.leftArrow} onClick={handleBack}>
          <IoIosArrowBack />
        </button>
        <button className={styles.rightArrow} onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
