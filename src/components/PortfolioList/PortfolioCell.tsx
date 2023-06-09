import React from 'react';
import { useNavigate } from 'react-router-dom';

//타입
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';

// 스타일
import styles from './PortfolioCell.module.scss';
import ROUTES from '../../constants/Routes';

function PortfolioCell({
  isLoading = false,
  portfolio = null,
}: {
  isLoading?: boolean;
  portfolio?: TypePortfolioList | null;
}) {
  const navigate = useNavigate();

  // 로딩 중이면 스켈레톤 UI를 반환
  if (isLoading)
    return (
      <div>
        <div></div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    );

  if (!portfolio) return <></>;

  return (
    <div className={styles.container} onClick={() => navigate(`${ROUTES.PORTFOLIO_DETAIL}${87}`)}>
      {portfolio.img ? (
        <img className={styles.image} src={portfolio.img} alt="포트폴리오 섬네일" />
      ) : (
        ''
      )}
      <p className={styles.title}>{portfolio.title}</p>
      <p className={styles.summary}>{portfolio.summary}</p>
      <p className={styles.stacks}>
        {portfolio.stack &&
          portfolio.stack.stackList.map((stack) => {
            return <span key={stack}>{stack}</span>;
          })}
      </p>
      <p className={styles.informations}>
        <span>{portfolio.views}</span>
        <span> · </span>
        <span>{portfolio.comments}</span>
        <span> · </span>
        <span>{portfolio.bookmarks}</span>
      </p>
    </div>
  );
}
export default PortfolioCell;
