import { useState } from 'react';
import styles from './ProjectSearch.module.scss';

interface ProjectSearchProps {
  handleChange: (keyword: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  value: string;
}
function ProjectSearch({ handleSubmit, handleChange, value }: ProjectSearchProps) {
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
    </div>
  );
}

export default ProjectSearch;
