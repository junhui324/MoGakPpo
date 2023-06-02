import { useState } from 'react';
import styles from './ProjectSearch.module.scss';

interface ProjectSearchProps {
  handleChange: (keyword: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  value: string;
  searchKeyword: string;
  isSearched: boolean;
  handleSearchCancelClick: () => void;
}
function ProjectSearch({
  handleSubmit,
  handleChange,
  value,
  searchKeyword,
  isSearched,
  handleSearchCancelClick,
}: ProjectSearchProps) {
  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="제목, 내용, 기술스택으로 검색"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        ></input>
        <button>🔍</button>
      </form>
      {isSearched && (
        <div>
          <p>{searchKeyword}로 검색한 결과</p>
          <button onClick={handleSearchCancelClick}>초기화</button>
        </div>
      )}
    </div>
  );
}

export default ProjectSearch;
