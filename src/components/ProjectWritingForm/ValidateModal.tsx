import styles from './ValidateModal.module.scss';
import ModalFullScreen from './../common/Modal/ModalFullScreen';

interface ValidateModalProps {
  setModalOpen: (value: boolean) => void;
}
const ValidateModal = ({ setModalOpen }: ValidateModalProps) => {
  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div className={styles.modalContainer}>
        <p>
          <span>필수 항목</span>
          <span>*</span> 을 입력해주세요!
        </p>
      </div>
    </ModalFullScreen>
  );
};

export default ValidateModal;
