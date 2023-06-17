import styles from './RecruitingProjectFilter.module.scss';

interface RecruitingFilterProps {
  onChange: (value: string) => void;
}

function RecruitingProjectFilter({ onChange }: RecruitingFilterProps) {
  return (
    <div className={styles.container}>
      <label id="recruiting-filter">
        <select onChange={(e) => onChange(e.target.value)}>
          <option value="all">전체 모집 글 보기</option>
          <option value="true">모집 중만 보기</option>
          <option value="false">모집 완료만 보기</option>
        </select>
      </label>
    </div>
  );
}

export default RecruitingProjectFilter;
