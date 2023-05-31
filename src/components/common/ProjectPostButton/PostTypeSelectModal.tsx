import ModalBasic from '../Modal/ModalBasic';
import styles from './PostTypeSelectModal.module.scss';
import { BsArrowRight } from 'react-icons/bs';

interface PostTypeSelectModalProps {
  setModalOpen: (value: boolean) => void;
}
const PostTypeSelectModal = ({ setModalOpen }: PostTypeSelectModalProps) => {
  return (
    <ModalBasic setModalOpen={setModalOpen} closeButton={false} fullScreen={true}>
      <ul className={styles.ulContainer}>
        <p>작성할 프로젝트 타입을 골라주세요.</p>
        <li>
          사이드 프로젝트
          <BsArrowRight />
        </li>
        <li>
          스터디
          <BsArrowRight />
        </li>
      </ul>
    </ModalBasic>
  );
};

export default PostTypeSelectModal;
