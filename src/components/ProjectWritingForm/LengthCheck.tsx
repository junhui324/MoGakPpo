interface LengthCheckProps {
  valueLength: number;
  maxLength: number;
}
function LengthCheck({ valueLength, maxLength }: LengthCheckProps) {
  return (
    <span>
      {valueLength}/{maxLength}
    </span>
  );
}

export default LengthCheck;
