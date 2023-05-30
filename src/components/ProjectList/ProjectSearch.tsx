import styles from './ProjectSearch.module.scss';

function ProjectSearch() {
  return (
    <div className={styles.container}>
      <form>
        <input type="text" placeholder="제목, 내용, 기술스택으로 검색"></input>
        <button>🔍</button>
      </form>
    </div>
  );
}

export default ProjectSearch;
