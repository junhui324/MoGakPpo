import React, { useState } from 'react';
import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <div>
        <span>🔍</span>
        <input
          type="text"
          placeholder="제목, 내용, 기술스택으로 검색하세요!"
          value={value}
          onChange={onSearch}
        />
      </div>
      <button
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
