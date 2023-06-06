import styles from './LoadingProject.module.scss';

interface LoadingProjectProps {
  innerRef?: any;
}
function LoadingProject({ innerRef }: LoadingProjectProps) {
  return (
    <li className={styles.loadingList} ref={innerRef && innerRef}>
      <div>
        <div className={styles.topContainer}>
          <div>
            <div className={`${styles.loadingBox} ${styles.type}`}></div>
            <div className={`${styles.loadingBox} ${styles.goal}`}></div>
          </div>
          <div>
            <div className={`${styles.loadingBox} ${styles.participationTime}`}></div>
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        <div className={`${styles.loadingBox} ${styles.status}`}></div>
        <div className={`${styles.loadingBox} ${styles.title}`}></div>
      </div>
      <div className={`${styles.loadingBox} ${styles.summary}`}></div>
      <div className={`${styles.loadingBox} ${styles.roleContainer}`}></div>
    </li>
  );
}

export default LoadingProject;
