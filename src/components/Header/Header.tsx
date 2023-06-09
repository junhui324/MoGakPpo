import * as Token from '../../apis/Token';
import ROUTES from '../../constants/Routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { MyPageModal } from './MyPageModal';
import { FaUserCircle } from 'react-icons/fa';
import ProjectPostButton from '../common/ProjectPostButton';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import DefaultUserImg from '../../assets/DefaultUser.png';

function Header() {
  const loginData = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [classification, setClassification] = useRecoilState(classificationState);

  const onClickLogout = () => {
    Token.removeToken();
    navigate(`${ROUTES.HOME}`);
  };
  const handleLogoClick = () => {
    setClassification('/');
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo} onClick={handleLogoClick}>
            모프 🪄
          </span>
          <ul>
            <li onClick={() => navigate(ROUTES.PROJECT_LIST)}>멤버 모집</li>
            <li onClick={() => navigate(ROUTES.PROJECT_LIST)}>프로젝트 자랑</li>
          </ul>
        </div>
        <div className={styles.rightContainer}>
          {Token.getToken() ? (
            <>
              {loginData.user_name && <p>{loginData.user_name}님 안녕하세요!</p>}{' '}
              <button
                className={styles.userButton}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                {<img src={loginData.user_img || DefaultUserImg} alt="유저 프로필" />}
                {/* <FaUserCircle /> */}
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
              <button
                onClick={() => {
                  navigate(ROUTES.REGISTER);
                }}
              >
                회원가입
              </button>
            </div>
          )}
          {/* <ProjectPostButton /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
