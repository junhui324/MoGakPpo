import styles from './contentsFilter.module.scss';

interface ContentsFilterProps {
  onChange: (value: string) => void;
}

function ContentsFilter({ onChange }: ContentsFilterProps) {
  return (
    <div className={styles.container}>
      <label>
        <select onChange={(e) => onChange(e.target.value)}>
          <option value="all">전체</option>
          <option value="project">프로젝트</option>
          <option value="portfolio">포트폴리오</option>
        </select>
      </label>
    </div>
  );
}

export default ContentsFilter;
