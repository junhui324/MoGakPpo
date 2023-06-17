import { useRef, useState } from 'react';
import styles from './ThumbnailInput.module.scss';

interface ThumbnailInputProps {
  onInputChange: (file: File) => void;
  imgFile: File;
  thumbnailSrc: string;
}
function ThumbnailInput({ onInputChange, imgFile, thumbnailSrc }: ThumbnailInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonShow, setButtonShow] = useState(true);

  const onMouseHandler = () => {
    imgFile && setButtonShow(true);
  };

  const leaveMouseHandler = () => {
    imgFile && setButtonShow(false);
  };

  return (
    <div className={styles.container}>
      <div onMouseEnter={() => onMouseHandler()} onMouseLeave={() => leaveMouseHandler()}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            e.target.files && onInputChange(e.target.files?.[0]);
          }}
        />
        <div
          style={!buttonShow ? { display: 'none' } : undefined}
          className={styles.buttonContainer}
        >
          <button
            className={`${styles.thumbnailButton}`}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            썸네일 올리기
          </button>
        </div>
        {thumbnailSrc && <img src={thumbnailSrc} alt="썸네일 미리보기" />}
      </div>
    </div>
  );
}

export default ThumbnailInput;
