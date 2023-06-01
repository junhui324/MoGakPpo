import ModalBasic from '../Modal/ModalBasic';
import styles from './PostTypeSelectModal.module.scss';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../constants/Routes';

interface PostTypeSelectModalProps {
  setModalOpen: (value: boolean) => void;
}
const PostTypeSelectModal = ({ setModalOpen }: PostTypeSelectModalProps) => {
  const navigate = useNavigate();
  return (
    <ModalBasic setModalOpen={setModalOpen} closeButton={false} fullScreen={true}>
      <ul className={styles.ulContainer}>
        <p>작성할 프로젝트 타입을 골라주세요.</p>
        <li
          onClick={() => {
            navigate(`${ROUTES.CREATE}project`);
            setModalOpen(false);
          }}
        >
          사이드 프로젝트
          <BsArrowRight />
        </li>
        <li
          onClick={() => {
            navigate(`${ROUTES.CREATE}study`);
            setModalOpen(false);
          }}
        >
          스터디 / 모임
          <BsArrowRight />
        </li>
      </ul>
    </ModalBasic>
  );
};

export default PostTypeSelectModal;
