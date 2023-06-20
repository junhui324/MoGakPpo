import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import ModalFullScreen from '../common/Modal/ModalFullScreen';
import styles from './AccountManagementModal.module.scss';

interface ModalBasicProps {
  setAccountManagementModalOpen: (value: boolean) => void;
}
export function AccountManagementModal({ setAccountManagementModalOpen }: ModalBasicProps) {
  const navigate = useNavigate();

  return (
    <ModalFullScreen setModalOpen={setAccountManagementModalOpen} closeButton={false}>
      <div>
        <ul className={styles.ulContainer}>
          <li
            onClick={() => {
              navigate(ROUTES.EDIT_PASSWORD);
              setAccountManagementModalOpen(false);
            }}
          >
            비밀번호 변경 🔐
          </li>
          <li
            onClick={() => {
              navigate(ROUTES.DELETE_ACCOUNT);
              setAccountManagementModalOpen(false);
            }}
          >
            회원 탈퇴 💔
          </li>
        </ul>
      </div>
    </ModalFullScreen>
  );
}
