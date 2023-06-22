import ROUTES from '../../constants/Routes';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import { IoIosArrowForward } from 'react-icons/io';
import { SlArrowUpCircle } from 'react-icons/sl';
import Logo from '../../assets/Logo.png';

export default function Footer() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(`${ROUTES.MAIN}`);
  };
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <img src={Logo} onClick={handleLogoClick} style={{ width: 120 }} alt="logo" />
        <div
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <SlArrowUpCircle size={40} />
        </div>
      </div>
      <div className={styles.footerMain}>
        <div className={styles.contact}>
          <h3>고객 문의</h3>
          <h2>02-1234-5678</h2>
          <span>
            11:00 - 24:00
            <strong>주말, 공휴일 포함</strong>
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
        <div className={styles.menuList}>
          <Link
            to="https://www.notion.so/moppe/65736633f09d48a7a68be563e0e1dd0c?pvs=4"
            className={styles.linkMenu}
          >
            ICE팀의 여정
            <IoIosArrowForward />
          </Link>
          <br />
          <Link
            to="https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team07"
            className={styles.linkMenu}
          >
            Git Lab
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.teamInfo}>
          <p>(팀)ICE | 서울 성동구 아차산로17길 48 성수낙낙 2층 엘리스랩 </p>
          <p>이새미 | 박지원 | 신혜지 | 이주영 | 장준희 | 김차미 | 송현수</p>
          <br />
          <p>© 2023 Team ICE, Elice SW4</p>
        </div>
      </div>
    </div>
  );
}
