import styles from './contentsFilter.module.scss';

interface ContentsFilterProps {
  onChange: (value: string) => void;
}

function ContentsFilter({ onChange }: ContentsFilterProps) {
  return (
    <div className={styles.container}>
      <label>
        <select onChange={(e) => onChange(e.target.value)}>
          <option value="project">멤버 모집</option>
          <option value="portfolio">프로젝트 자랑</option>
        </select>
      </label>
    </div>
  );
}

export default ContentsFilter;
