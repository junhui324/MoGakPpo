interface RecruitingFilterProps {
  isFilterChecked: boolean;
  onChange: any;
}

function RecruitingProjectFilter({ isFilterChecked, onChange }: RecruitingFilterProps) {
  return (
    <div>
      <label id="recruiting-filter">
        모집 중만 보기
        <input
          id="recruiting-filter"
          type="checkbox"
          checked={isFilterChecked}
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
}

export default RecruitingProjectFilter;
