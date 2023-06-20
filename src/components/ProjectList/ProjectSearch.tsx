import { AiFillCloseCircle } from 'react-icons/ai';
import styles from './ProjectSearch.module.scss';

interface ProjectSearchProps {
  handleChange: (keyword: string) => void;
  value: string;
}

function ProjectSearch({ handleChange, value }: ProjectSearchProps) {
  return (
    <div className={styles.container}>
      <div>
        <span>🔍</span>
        <input
          type="text"
          placeholder="제목, 내용, 기술스택으로 검색"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        ></input>
        {value.length > 0 && (
          <button onClick={() => handleChange('')}>
            <AiFillCloseCircle />
          </button>
        )}
      </div>
      {value.length > 0 && (
        <div className={styles.resultContainer}>
          <p>"{value}"(으)로 검색한 결과</p>
        </div>
      )}
    </div>
  );
}

export default ProjectSearch;
