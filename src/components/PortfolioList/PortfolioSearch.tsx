import React, { useState } from 'react';
import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import * as Token from '../../apis/Token';

import styles from './PortfilioSearch.module.scss';
import { useMediaQuery } from 'react-responsive';

function PortfolioSearch({
  onSearch,
  value,
}: {
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}) {
  // 라우팅
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  const handlePostMove = () => {
    if (Token.getToken()) navigate(ROUTES.PORTFOLIO_CREATE);
    else {
      alert('로그인 후 사용 가능합니다.');
      navigate(ROUTES.LOGIN);
      return;
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.searchBox} onSubmit={(event) => event.preventDefault()}>
        <span>🔍</span>
        <input
          type="text"
          placeholder={isMobile ? '검색어 입력' : '제목, 내용, 기술스택으로 검색하세요!'}
          value={value}
          onChange={onSearch}
        />
      </form>
      <button className={styles.postButton} onClick={handlePostMove}>
        📢 자랑 하기
      </button>
    </div>
  );
}

export default PortfolioSearch;
