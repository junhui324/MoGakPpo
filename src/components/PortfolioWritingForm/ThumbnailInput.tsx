import { RefObject, useRef, useState } from 'react';
import styles from './ThumbnailInput.module.scss';
import { useMediaQuery } from 'react-responsive';

interface ThumbnailInputProps {
  onInputChange: (file: File) => void;
  imgFile: File;
  thumbnailSrc: string;
  innerRef?: RefObject<HTMLButtonElement>;
}
function ThumbnailInput({ onInputChange, imgFile, thumbnailSrc, innerRef }: ThumbnailInputProps) {
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonShow, setButtonShow] = useState(true);

  const onMouseHandler = () => {
    imgFile && setButtonShow(true);
  };

  const leaveMouseHandler = () => {
    imgFile && setButtonShow(false);
  };

  return (
    <div
      className={
        !isMobile ? `${styles.container}` : `${styles.container} ${styles.mobileContainer}`
      }
    >
      {' '}
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
            ref={innerRef ? innerRef : undefined}
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
