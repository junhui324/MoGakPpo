import { useEffect, useState } from 'react';

interface ThumbnailInputProps {
  onInputChange: (file: File) => void;
  imgFile: File;
}
function ThumbnailInput({ onInputChange, imgFile }: ThumbnailInputProps) {
  const [thumbnailSrc, setThumbnailSrc] = useState('');

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailSrc(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

  return (
    <div>
      <div>{thumbnailSrc && <img src={thumbnailSrc} alt="썸네일 미리보기" />}</div>
      <input
        type="file"
        onChange={(e) => {
          e.target.files && onInputChange(e.target.files?.[0]);
        }}
      />
    </div>
  );
}

export default ThumbnailInput;
