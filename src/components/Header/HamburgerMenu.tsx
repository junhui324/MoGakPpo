import * as Token from '../../apis/Token';
import ROUTES from '../../constants/Routes';
import { NavLink } from 'react-router-dom';
import styles from './HamburgerMenu.module.scss';

import ToggleDarkModeButton from '../common/DarkMode/ToggleDarkMode';
import DefaultUserImg from '../../assets/DefaultUser.png';
import Logo from '../../assets/Logo.png';

import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { themeAtom } from '../../recoil/themeState';
import { useEffect, useRef } from 'react';

interface HamburgerMenuProps {
  handleNavLinkClick: () => void;
  loginData: any;
  setHamburgerOpen: (value: boolean) => void;
  onClickLogout: () => void;
  handleLoginClick: () => void;
  handleSigninClick: () => void;
}
export default function HamburgerMenu({
  handleNavLinkClick,
  loginData,
  setHamburgerOpen,
  onClickLogout,
  handleLoginClick,
  handleSigninClick,
}: HamburgerMenuProps) {
  const darkMode = useRecoilValue(themeAtom);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
        setHamburgerOpen(false);
      }
    };

    document.addEventListener('mousedown', (event) => handler(event));

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', (event) => handler(event));
    };
  });

  return ReactDOM.createPortal(
    <div className={`${darkMode ? `${styles.darkMode}` : ''}`}>
      <div className={styles.overlay}></div>
      <div className={styles.container} ref={hamburgerRef}>
        <div className={styles.topContainer}>
          <img alt="로고" className={styles.logo} src={Logo} />
          <button onClick={() => setHamburgerOpen(false)}>
            <MdClose />
          </button>
        </div>
        <ul>
          <li>
            <NavLink
              to={`${ROUTES.PROJECT_LIST}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
              onClick={() => {
                handleNavLinkClick();
                setHamburgerOpen(false);
              }}
            >
              <span>멤버 모집</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${ROUTES.PORTFOLIO_LIST}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
              onClick={() => {
                handleNavLinkClick();
                setHamburgerOpen(false);
              }}
            >
              <span>프로젝트 자랑</span>
            </NavLink>
          </li>
          {Token.getToken() && (
            <li>
              <NavLink
                to={`${ROUTES.MY_PAGE}`}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => {
                  handleNavLinkClick();
                  setHamburgerOpen(false);
                }}
              >
                <span>마이페이지</span>
              </NavLink>
            </li>
          )}
          {Token.getToken() && (
            <li>
              <NavLink
                to={`${ROUTES.MY_PAGE}`}
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => {
                  handleNavLinkClick();
                  onClickLogout();
                }}
              >
                <span>로그아웃</span>
              </NavLink>
            </li>
          )}
        </ul>
        <div className={styles.bottomContainer}>
          {Token.getToken() ? (
            <div className={styles.loggedIn}>
              <button className={styles.userButton}>
                {<img src={loginData.user_img || DefaultUserImg} alt="유저 프로필" />}
              </button>
              {loginData.user_name && <p>{loginData.user_name}님 안녕하세요!</p>}
            </div>
          ) : (
            <div className={styles.notLoggedIn}>
              <button
                onClick={() => {
                  handleLoginClick();
                  setHamburgerOpen(false);
                }}
              >
                로그인
              </button>
              <span>|</span>
              <button
                onClick={() => {
                  handleSigninClick();
                  setHamburgerOpen(false);
                }}
              >
                회원가입
              </button>
            </div>
          )}
          <ToggleDarkModeButton />
        </div>
      </div>
    </div>,
    document.getElementById('root') as Element
  );
}
