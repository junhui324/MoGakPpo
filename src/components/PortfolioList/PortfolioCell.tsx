import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Fetcher from '../../apis/Fetcher';
import * as Token from '../../apis/Token';

//타입
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';

// 스타일
import styles from './PortfolioCell.module.scss';
import ROUTES from '../../constants/Routes';
import { getIsNew } from '../../utils/getIsNew';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

function PortfolioCell({
  isLoading = false,
  portfolio = null,
}: {
  isLoading?: boolean;
  portfolio?: TypePortfolioList | null;
}) {
  const navigate = useNavigate();
  // 상태
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(
    portfolio ? portfolio.is_bookmarked : null
  );
  const [bookmarkCount, setBookmarkCount] = useState<number | null>(
    portfolio ? portfolio.portfolio_bookmark_count : null
  );

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

  const handlePortfolioConfirm = () => {
    navigate(`${ROUTES.PORTFOLIO_DETAIL}${portfolio.portfolio_id}`);
    // 스크롤을 맨 위로 올립니다.
    window.scrollTo(0, 0);
  };

  const handleBookmark = async () => {
    if (!Token.getToken()) {
      alert('로그인 후 사용 가능합니다.');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      isBookmarked
        ? await Fetcher.deletePortfolioBookmark(portfolio.portfolio_id)
        : await Fetcher.postPortfolioBookmark(portfolio.portfolio_id);

      setIsBookmarked((prev) => !prev);
      setBookmarkCount((prev) => {
        if (prev !== null) return isBookmarked ? prev - 1 : prev + 1;
        return null;
      });
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '401':
            alert('토큰이 만료되었습니다.');
            navigate(`${ROUTES.LOGIN}`);
            break;
          default:
            alert(`${error} : 예기치 않은 오류가 발생했습니다.`);
            return;
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.bookmarkButton} onClick={handleBookmark}>
        {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
      </button>
      {portfolio.portfolio_thumbnail ? (
        <img
          className={styles.image}
          src={portfolio.portfolio_thumbnail}
          alt="포트폴리오 섬네일"
          onClick={handlePortfolioConfirm}
        />
      ) : (
        ''
      )}
      <div className={styles.textContainer} onClick={handlePortfolioConfirm}>
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
            <span className={styles.ellipsis}>
              + {portfolio.portfolio_stacks?.stackList.length - 3}
            </span>
          )}
        </div>
      </div>
      <div className={styles.informations}>
        <span>👀</span>
        <span>{portfolio.portfolio_views_count}</span>
        <span>💬</span>
        <span>{portfolio.portfolio_comments_count}</span>
        <span>📌</span>
        <span>{bookmarkCount}</span>
      </div>
    </div>
  );
}
export default PortfolioCell;
