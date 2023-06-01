import React, { useState } from 'react';
import styles from './RadioButton.module.scss';

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

function RadioButton({ label, value, name, checked, onChange }: RadioButtonProps) {
  const handleChange = () => {
    if (checked) {
      onChange(''); // 선택 해제
    } else {
      onChange(value); // 선택
    }
  };

  return (
    <label className={styles.radioButton}>
      <input type="radio" value={value} name={name} checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
}

export default RadioButton;
