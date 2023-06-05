import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ id, label, onChange }: CheckboxProps) {
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
