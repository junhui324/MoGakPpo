import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

function Checkbox({ id, label, onChange, isChecked }: CheckboxProps) {
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} checked={isChecked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
