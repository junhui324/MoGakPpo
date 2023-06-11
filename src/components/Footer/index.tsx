import ROUTES from '../../constants/Routes';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import { IoIosArrowForward } from 'react-icons/io';
import ChatBot from '../ChatBot';

export default function Footer() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(`${ROUTES.MAIN}`);
  };
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerHeader}>
        <span className={styles.logo} onClick={handleLogoClick}>
          모프 🪄
        </span>
      </div>
      <div className={styles.footerMain}>
        <div className={styles.contact}>
          <h3>고객 문의</h3>
          <h2>02-1234-5678</h2>
          <span>
            10:00 - 18:00
            <strong>주말, 공휴일 제외</strong>
          </span>
          <br />
          <span>moppe_help@elice.com</span>
        </div>
        <div className={styles.menuList}>
          <h3>멤버모집</h3>
          <Link to={`${ROUTES.PROJECT_LIST}`}>모집글 전체보기</Link>
          {/* <Link to={``}>모집글 작성하기</Link> */}
          <div className={styles.footerPostButton}></div>
        </div>
        <div className={styles.menuList}>
          <h3>프로젝트 자랑</h3>
          <Link to={`${ROUTES.PORTFOLIO_LIST}`}>프로젝트 전체보기</Link>
          {/* <Link to={``}>내 프로젝트 자랑하기</Link> */}
        </div>
      </div>
    </div>
  );
}
