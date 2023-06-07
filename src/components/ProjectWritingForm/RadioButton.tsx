import styles from './RadioButton.module.scss';

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  //onChange: (value: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioButton({ label, value, name, checked, onChange }: RadioButtonProps) {
  return (
    <label className={styles.radioButton}>
      <input type="radio" value={value} name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default RadioButton;
