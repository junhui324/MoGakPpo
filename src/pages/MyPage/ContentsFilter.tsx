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
          <option value="recruit">구인</option>
          <option value="project">프로젝트</option>
        </select>
      </label>
    </div>
  );
}

export default ContentsFilter;
