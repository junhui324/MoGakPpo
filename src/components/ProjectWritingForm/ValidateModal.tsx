import ModalBasic from '../common/Modal/ModalBasic';
import styles from './ValidateModal.module.scss';

interface ValidateModalProps {
  setModalOpen: (value: boolean) => void;
}
const ValidateModal = ({ setModalOpen }: ValidateModalProps) => {
  return (
    <ModalBasic setModalOpen={setModalOpen} closeButton={false} fullScreen={true}>
      <div className={styles.modalContainer}>
        <p>
          <span>필수 항목</span>
          <span>*</span> 을 입력해주세요!
        </p>
      </div>
    </ModalBasic>
  );
};

export default ValidateModal;
