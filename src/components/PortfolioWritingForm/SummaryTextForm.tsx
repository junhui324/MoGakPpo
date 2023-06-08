interface SummaryTextFormProps {
  value: string;
  onChange: (value: string) => void;
}

function SummaryTextForm({ value, onChange }: SummaryTextFormProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="프로젝트 요약을 입력해 주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SummaryTextForm;
