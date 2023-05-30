import React, { useState } from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

function RadioButton({ label, value, checked, onChange }: RadioButtonProps) {
  const handleChange = () => {
    if (!checked) {
      onChange(value);
    }
  };

  return (
    <label>
      <input type="radio" value={value} checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
}

export default RadioButton;
