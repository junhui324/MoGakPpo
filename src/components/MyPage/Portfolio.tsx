import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Token from '../../apis/Token';
import { deletePortfolioBookmark, postPortfolioBookmark } from '../../apis/Fetcher';
import { TypePortfolioList } from '../../interfaces/Portfolio.interface';
import ROUTES from '../../constants/Routes';
import { getIsNew } from '../../utils/getIsNew';
import getDateFormat from '../../utils/getDateFormat';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import styles from './portfolio.module.scss';

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
    portfolio_thumbnail: thumbnail,
    portfolio_created_at: createdAt,
  } = portfolioData;

  const [bookmark, setBookmark] = useState(isBookmarked);

  const handleBookmarkClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (Token.getToken()) {
      const updatedBookmark = !bookmark;
      setBookmark(updatedBookmark);
      try {
        updatedBookmark
          ? await postPortfolioBookmark(portfolioId)
          : await deletePortfolioBookmark(portfolioId);
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
      navigate(`${ROUTES.PORTFOLIO_LIST}/info/${portfolioId}`);
      }}
    >
      <div className={styles.topContainer}>
        {thumbnail 
        ? <img src={thumbnail} alt={'포트폴리오 섬네일'} /> 
        : <img src={'https://i0.wp.com/sciencefestival.kr/wp-content/uploads/2023/02/placeholder.png?ssl=1'} alt='포트폴리오 섬네일'/>}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>{title}</div>
            {getIsNew(createdAt) && <div className={styles.newTag}>NEW</div>}
          </div>
          <div>
            {isBookmarked !== undefined && (
              <button className={styles.bookmarkButton} onClick={(e) => handleBookmarkClick(e)}>
                {bookmark ? <BsBookmarkFill /> : <BsBookmark />}
              </button>
            )}
          </div>
        </div>
        {summary ? <p className={styles.summary}>{summary}</p> : <p className={styles.summary}>&nbsp;</p>}
        <div className={styles.createdAt}>{getDateFormat(createdAt)}</div>
      </div>
    </li>
  );
}

export default Portfolio;
