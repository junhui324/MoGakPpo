import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/ProjectList/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div>
          <Category />
          <ProjectPostButton />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <ProjectSearch />
        <ProjectList />
      </div>
    </div>
  );
}

export default Main;
