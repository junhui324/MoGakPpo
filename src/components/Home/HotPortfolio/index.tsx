import { getPortfolioList } from '../../../apis/Fetcher';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './HotPortfolio.module.scss';
import { TypePortfolioList } from '../../../interfaces/Portfolio.interface';
import { IoIosArrowForward } from 'react-icons/io';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ROUTES from '../../../constants/Routes';

export default function HotPortfolio() {
  const navigate = useNavigate();
  const imgPlaceholder =
    'https://i0.wp.com/sciencefestival.kr/wp-content/uploads/2023/02/placeholder.png?ssl=1';

  const [portfolioList, setPortfolioList] = useState<TypePortfolioList[]>([]);
  const getPortfolioListData = async () => {
    try {
      const response = await getPortfolioList(1, '', true);
      //@ts-ignore
      setPortfolioList(response.pagenatedPortfolios);
    } catch (error: any) {
      if (error.message === '400') {
        setPortfolioList([]);
      }
    }
  };
  // /api/v1/portfolios?keyword=false&sort=true&page=1
  useEffect(() => {
    getPortfolioListData();
  }, []);
  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  useEffect(() => {
    setMove(() => ({ transform: `translateX(${currentId * -100}%)` }));
  }, [currentId]);

  const totalItems = Math.ceil(portfolioList.length / 3);

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
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.arrowButton}>
          <button onClick={handleBack} disabled={currentId === 0 ? true : false}>
            <BsArrowLeft />
          </button>
          <button onClick={handleNext} disabled={currentId === totalItems - 1 ? true : false}>
            <BsArrowRight />
          </button>
        </div>
        <button className={styles.toAllButton} onClick={() => navigate(`${ROUTES.PORTFOLIO_LIST}`)}>
          모두 보기 <IoIosArrowForward />
        </button>
      </div>
      <div className={styles.slideArea}>
        <div className={styles.portfolioList} style={move}>
          {portfolioList.map((portfolio) => (
            <Link to={`/portfolios/${portfolio.portfolio_id}`} key={portfolio.portfolio_id}>
              <div className={styles.portfolioContainer}>
                <div className={styles.portfolio}>
                  <div className={styles.imgContainer}>
                    {portfolio.portfolio_thumbnail ? (
                      <img src={portfolio.portfolio_thumbnail} alt="포트폴리오 썸네일" />
                    ) : (
                      <img src={imgPlaceholder} alt="썸네일 불러오기 실패" />
                    )}
                  </div>
                  <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>{portfolio.portfolio_title}</h1>
                    <h3 className={styles.summary}>{portfolio.portfolio_summary}</h3>
                    <div className={styles.stackContainer}>
                      <div className={styles.stack}>
                        {portfolio.portfolio_stacks.stackList?.map((stack, index) => (
                          <p key={`${stack}-${index}`}>{stack}</p>
                        ))}
                      </div>
                    </div>
                    <div className={styles.viewWrapper}>
                      <span>👀</span>
                      <span className={styles.count}>{portfolio.portfolio_views_count}</span>
                      <span>💬</span>
                      <span className={styles.count}>{portfolio.portfolio_comments_count}</span>
                      <span>📌</span>
                      <span className={styles.count}>{portfolio.portfolio_bookmark_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
