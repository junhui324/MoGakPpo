import * as Token from '../../apis/Token';
import ROUTES from '../../constants/Routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { MyPageModal } from './MyPageModal';
import { FaUserCircle } from 'react-icons/fa';
import ProjectPostButton from '../common/ProjectPostButton';
// import { isLoggedIn } from '../../hooks/login';

function Header() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const onClickLogout = () => {
    Token.removeToken();
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo} onClick={() => navigate(ROUTES.HOME)}>
            모프 🪄
          </span>
        </div>
        <div className={styles.rightContainer}>
          {Token.getToken() ? (
            <>
              <button
                className={styles.userButton}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <FaUserCircle />
              </button>
              <MyPageModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onClickLogout={onClickLogout}
              />
            </>
          ) : (
            <div className={styles.notLoggedIn}>
              <button
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                로그인
              </button>
              <span>|</span>
              <button>회원가입</button>
            </div>
          )}
          <ProjectPostButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
