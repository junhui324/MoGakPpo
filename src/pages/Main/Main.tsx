import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <Category />
      <ProjectList />
    </div>
  );
}

export default Main;
