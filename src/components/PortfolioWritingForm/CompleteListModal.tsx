import styles from './CompleteListModal.module.scss';
import ModalFullScreen from '../common/Modal/ModalFullScreen';

interface CompleteListModalProps {
  setModalOpen: (value: boolean) => void;
}

function CompleteListModal({ setModalOpen }: CompleteListModalProps) {
  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div>여기에 모집완료 게시글 리스트가 나올 예정입니다</div>
    </ModalFullScreen>
  )
}

export default CompleteListModal;