import { useEffect, useState } from 'react';
import { getProjects } from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './NewPosts.module.scss';
import { getIsNew } from '../../utils/getIsNew';

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

  return (
    <div className={styles.slideArea}>
      <div className={styles.projectList}>
        {projectList.map((project) => (
          <div key={project.project_id} className={styles.project}>
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
        ))}
      </div>
    </div>
  );
}
