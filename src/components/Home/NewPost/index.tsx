import { useEffect, useState } from 'react';
import { getProjects } from '../../../apis/Fetcher';
import { TypeProjectList } from '../../../interfaces/Project.interface';
import styles from './NewPosts.module.scss';
import { getIsNew } from '../../../utils/getIsNew';

export default function NewPosts() {
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const getProjectListData = async (): Promise<void> => {
    try {
      const response = await getProjects('all', true, false, 1);
      setProjectList(response.data.pagenatedProjects);
    } catch (error: any) {
      if (error.message === '404') {
        setProjectList([]);
      }
    }
  };
  useEffect(() => {
    getProjectListData();
  }, []);

  const [currentId, setCurrentId] = useState(0);
  const [move, setMove] = useState<React.CSSProperties>();

  useEffect(() => {
    setMove(() => ({ transform: `translateX(${currentId * -100}%)` }));
  }, [currentId]);

  const totalItems = projectList.length / 2;

  const handleBack = () => {
    setCurrentId((curr) => (curr === 0 ? totalItems - 1 : curr - 1));
  };

  const handleNext = () => {
    setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
  };

  return (
    <div className={styles.newPosts}>
      <h1>새로운 프로젝트🎉</h1>
      <p>새로 업데이트된 모집글을 확인해보세요!</p>
      <button>모두 보기</button>
      <div className={styles.slideArea}>
        <button onClick={handleBack}>◀️</button>
        <span>{currentId + 1}</span>
        <button onClick={handleNext}>▶️</button>
        <div className={styles.projectList} style={move}>
          {projectList.map((project) => (
            <div key={project.project_id} className={styles.projectContainer}>
              <div className={styles.project}>
                <span>{project.project_type}</span>
                <span>{project.project_goal}</span>
                <h1>{project.project_title}</h1>
                {getIsNew(project.project_created_at) && <span className={styles.newTag}>NEW</span>}
                <h3>{project.project_summary}</h3>
                <p>{project.project_recruitment_roles?.roleList}</p>
                <span>👀{project.project_views_count}</span>
                <span>💬{project.project_comments_count}</span>
                <span>📌{project.project_bookmark_count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
