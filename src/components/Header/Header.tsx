import ROUTES from '../../constants/Routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { MyPageModal } from './MyPageModal';
import { FaUserCircle } from 'react-icons/fa';
import ProjectPostButton from '../common/ProjectPostButton';
// import { isLoggedIn } from '../../hooks/login';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo} onClick={() => navigate(ROUTES.HOME)}>
            모프 🪄
          </span>
        </div>
        <div className={styles.rightContainer}>
          {isLoggedIn ? (
            <>
              <button
                className={styles.userButton}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <FaUserCircle />
              </button>
              <MyPageModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
