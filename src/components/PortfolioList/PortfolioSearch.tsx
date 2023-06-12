import React, { useState } from 'react';
import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';

import styles from './PortfilioSearch.module.scss';

function PortfolioSearch({
  onSearch,
  value,
}: {
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}) {
  // 라우팅
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <form className={styles.searchBox} onSubmit={(event) => event.preventDefault()}>
        <span>🔍</span>
        <input
          type="text"
          placeholder="제목, 내용, 기술스택으로 검색하세요!"
          value={value}
          onChange={onSearch}
        />
      </form>
      <button
        className={styles.writeButton}
        onClick={() => {
          navigate(ROUTES.PORTFOLIO_CREATE);
        }}
      >
        글 작성
      </button>
    </div>
  );
}

export default PortfolioSearch;
