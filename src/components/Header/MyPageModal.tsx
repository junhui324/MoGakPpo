import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import ModalBasic from '../common/Modal/ModalBasic';
import styles from './MyPageModal.module.scss';

interface ModalBasicProps {
  setModalOpen: (value: boolean) => void;
  modalOpen: boolean;
}
export function MyPageModal({ modalOpen, setModalOpen }: ModalBasicProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.divContainer}>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} closeButton={false}>
          <ul className={styles.ulContainer}>
            <li
              onClick={() => {
                navigate(ROUTES.MY_PAGE);
                setModalOpen(false);
              }}
            >
              내 프로필
            </li>
            <li>계정 관리</li>
            <li>로그아웃</li>
          </ul>
        </ModalBasic>
      )}
    </div>
  );
}
