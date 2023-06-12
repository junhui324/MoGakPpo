import * as Token from '../../apis/Token';
import ROUTES from '../../constants/Routes';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import { MyPageModal } from './MyPageModal';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import DefaultUserImg from '../../assets/DefaultUser.png';
import Logo from '../../assets/Logo.png';

function Header() {
  const loginData = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const setClassification = useSetRecoilState(classificationState);
  const resetLogin = useResetRecoilState(loginAtom);

  const onClickLogout = () => {
    Token.removeToken();
    resetLogin();
    navigate(`${ROUTES.HOME}`);
  };
  const handleLogoClick = () => {
    setClassification('/');
    navigate(`${ROUTES.MAIN}`);
  };
  const handleNavLinkClick = () => {
    setClassification('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <div className={styles.leftContainer}>
          <img
            className={styles.logo}
            src={Logo}
            onClick={handleLogoClick}
            style={{ width: 160 }}
          />
          <NavLink
            to={`${ROUTES.PROJECT_LIST}`}
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={handleNavLinkClick}
          >
            <span>멤버 모집</span>
          </NavLink>
          <NavLink
            to={`${ROUTES.PORTFOLIO_LIST}`}
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={handleNavLinkClick}
          >
            <span> 프로젝트 자랑</span>
          </NavLink>
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
