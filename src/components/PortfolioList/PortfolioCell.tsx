import React from 'react';
import { useNavigate } from 'react-router-dom';

//타입
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';

// 스타일
import styles from './PortfolioCell.module.scss';
import ROUTES from '../../constants/Routes';
import { getIsNew } from '../../utils/getIsNew';

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
      {portfolio.portfolio_thumbnail ? (
        <img className={styles.image} src={portfolio.portfolio_thumbnail} alt="포트폴리오 섬네일" />
      ) : (
        ''
      )}
      <div className={styles.textContainer}>
        <div className={styles.titleBox}>
          <p className={styles.title}>{portfolio.portfolio_title}</p>
          {getIsNew(portfolio.portfolio_created_at) && <p className={styles.new}>NEW</p>}
        </div>
        <p className={styles.summary}>{portfolio.portfolio_summary}</p>
        <div className={styles.stacks}>
          {portfolio.portfolio_stacks.stackList &&
            portfolio.portfolio_stacks.stackList.slice(0, 3).map((stack) => {
              return <div key={stack}>{stack}</div>;
            })}
          {portfolio.portfolio_stacks?.stackList.length > 3 && (
            <span className={styles.ellipsis}>…</span>
          )}
        </div>
        <p className={styles.informations}>
          <span>👀</span>
          <span>{portfolio.portfolio_views_count}</span>
          <span>💬</span>
          <span>{portfolio.portfolio_comments_count}</span>
          <span>📌</span>
          <span>{portfolio.portfolio_bookmark_count}</span>
        </p>
      </div>
    </div>
  );
}
export default PortfolioCell;
