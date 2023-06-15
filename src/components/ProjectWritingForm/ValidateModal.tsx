import styles from './ValidateModal.module.scss';
import ModalFullScreen from './../common/Modal/ModalFullScreen';

interface ValidateModalProps {
  maxLengthValidate: boolean;
  setModalOpen: (value: boolean) => void;
}
const ValidateModal = ({ maxLengthValidate, setModalOpen }: ValidateModalProps) => {
  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div className={styles.modalContainer}>
        {maxLengthValidate ? (
          <p>
            <span>제목 또는 요약의 글자수</span>
            <span>*</span>가 너무 깁니다!
          </p>
        ) : (
          <p>
            <span>필수 항목</span>
            <span>*</span> 을 입력해주세요!
          </p>
        )}
      </div>
    </ModalFullScreen>
  );
};

export default ValidateModal;
