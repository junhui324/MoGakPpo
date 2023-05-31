import styles from './Header.module.scss';
function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo}>모프 🪄</span>
        </div>
        <div className={styles.rightContainer}>
          <button>마이페이지</button>
          <div>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
