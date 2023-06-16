import { RefObject } from 'react';

interface TitleTextFormProps {
  value: string;
  onChange: (value: string) => void;
  innerRef?: RefObject<HTMLInputElement>;
}

function TitleTextForm({ value, onChange, innerRef }: TitleTextFormProps) {
  return (
    <div>
      <input
        ref={innerRef ? innerRef : undefined}
        type="text"
        placeholder="프로젝트 타이틀을 입력해 주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TitleTextForm;
