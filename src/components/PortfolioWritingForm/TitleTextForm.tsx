import { RefObject } from 'react';
import styles from './TitleTextForm.module.scss';

interface TitleTextFormProps {
  value: string;
  onChange: (value: string) => void;
  innerRef?: RefObject<HTMLInputElement>;
}

function TitleTextForm({ value, onChange, innerRef }: TitleTextFormProps) {
  return (
    <div className={styles.container}>
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
