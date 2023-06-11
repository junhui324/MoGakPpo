import * as Token from '../../apis/Token';
import { TypePortfolioList } from '@/interfaces/Portfolio.interface';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import styles from './portfolio.module.scss';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import React, { useState } from 'react';
// import { deleteportfolioBookmark, postportfolioBookmark } from '../../apis/Fetcher';
import { getIsNew } from '../../utils/getIsNew';

interface portfolioDataProps {
  portfolioData: TypePortfolioList;
}

function Portfolio({ portfolioData }: portfolioDataProps) {
  const navigate = useNavigate();

  const {
    is_bookmarked: isBookmarked,
    portfolio_id: portfolioId,
    portfolio_title: title,
    portfolio_summary: summary,
    portfolio_stacks: stackList,
    portfolio_bookmark_count: bookmarkCount,
    portfolio_comments_count: commentsCount,
    portfolio_views_count: viewsCount,
    portfolio_created_at: createdAt,
  } = portfolioData;

  const [bookmark, setBookmark] = useState(isBookmarked);

  const handleBookmarkClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (Token.getToken()) {
      const updatedBookmark = !bookmark;
      setBookmark(updatedBookmark);
      try {
        // updatedBookmark
        //   ? await postportfolioBookmark(portfolioId)
        //   : await deleteportfolioBookmark(portfolioId);
      } catch (error) {
        console.log(error);
      }
    } else {
      // 로그인 되어있지 않으면 alert을 띄워주고 로그인 페이지로 이동합니다.
      alert('로그인 후 사용 가능합니다.');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <li
      key={portfolioId}
      className={styles.listContainer}
      onClick={() => {
      //  / navigate(`${ROUTES.portfolio}${portfolioId}`);
      }}
    >
      <div>
        <div className={styles.topContainer}>
          <div>
            {isBookmarked !== undefined && (
              <button className={styles.bookmarkButton} onClick={(e) => handleBookmarkClick(e)}>
                {bookmark ? <BsBookmarkFill /> : <BsBookmark />}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        <p className={styles.title}>{title}</p>
        {getIsNew(createdAt) && <span className={styles.newTag}>NEW</span>}
      </div>
      {summary && <p className={styles.summary}>{summary}</p>}
      {stackList && (
        <ul className={styles.stacksContainer}>
          <span>기술스택</span>
          <ul>
            {stackList.stackList &&
              stackList.stackList.map((stack, index) => (
                <li key={`stack-${index}`}>{stack}</li>
              ))}
          </ul>
        </ul>
      )}
      {(bookmarkCount > 0 || commentsCount > 0 || viewsCount > 0) && (
        <ul className={styles.countContainer}>
          {bookmarkCount > 0 ? (
            <li>
              <span>📌</span>
              <span className={styles.bookmarkCount}>{bookmarkCount}</span>
            </li>
          ) : undefined}
          {commentsCount > 0 ? (
            <li>
              <span>💬</span>
              <span className={styles.commentsCount}>{commentsCount}</span>
            </li>
          ) : undefined}
          {viewsCount > 0 ? (
            <li>
              <span>👀</span>
              <span className={styles.viewsCount}>{viewsCount}</span>
            </li>
          ) : undefined}
        </ul>
      )}
    </li>
  );
}

export default Portfolio;
