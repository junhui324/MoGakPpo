import styles from './RecruitingProjectFilter.module.scss';

interface RecruitingFilterProps {
  isFilterChecked: boolean;
  onChange: any;
}

function RecruitingProjectFilter({ isFilterChecked, onChange }: RecruitingFilterProps) {
  return (
    <div className={styles.container}>
      <label id="recruiting-filter">
        <input
          id="recruiting-filter"
          type="checkbox"
          checked={isFilterChecked}
          onChange={onChange}
        ></input>
        모집 중만 보기
      </label>
    </div>
  );
}

export default RecruitingProjectFilter;
