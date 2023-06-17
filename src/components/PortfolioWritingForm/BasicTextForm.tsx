interface BasicTextFormProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function BasicTextForm({ value, onChange, placeholder }: BasicTextFormProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder ? placeholder : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default BasicTextForm;
