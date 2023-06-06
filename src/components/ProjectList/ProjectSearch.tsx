import styles from './ProjectSearch.module.scss';

interface ProjectSearchProps {
  handleChange: (keyword: string) => void;
  value: string;
  isSearched: boolean;
}

function ProjectSearch({ handleChange, value, isSearched }: ProjectSearchProps) {
  return (
    <div className={styles.container}>
      <form>
        <span>🔍</span>
        <input
          type="text"
          placeholder="제목, 내용, 기술스택으로 검색"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        ></input>
      </form>
      {value.length > 0 && (
        <div className={styles.resultContainer}>
          <p>"{value}"(으)로 검색한 결과</p>
        </div>
      )}
    </div>
  );
}

export default ProjectSearch;
