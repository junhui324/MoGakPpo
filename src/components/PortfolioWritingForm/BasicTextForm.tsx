import { RefObject } from 'react';

interface BasicTextFormProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  innerRef?: RefObject<HTMLInputElement>;
}

function BasicTextForm({ value, onChange, placeholder, innerRef }: BasicTextFormProps) {
  return (
    <div>
      <input
        ref={innerRef ? innerRef : undefined}
        type="text"
        placeholder={placeholder ? placeholder : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default BasicTextForm;
