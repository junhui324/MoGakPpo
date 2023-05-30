import { useEffect, useState } from 'react';
import { getProjectList } from '../../apis/project';
import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';

function ProjectList() {
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const projectList = await getProjectList();
        setProjectList(projectList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul className={styles.container}>
      {projectList.map((project) => {
        const {
          project_id,
          project_type: type,
          project_recruitment_status: recruitmentStatus,
          project_title: title,
          project_summary: summary,
          project_recruitment_roles: recruitmentRoles,
          project_required_stacks: requiredStacks,
          project_goal: goal,
          project_participation_time: participationTime,
          project_bookmark_count: bookmarkCount,
          project_comments_count: commentsCount,
          project_views_count: viewsCount,
          project_created_at: created_at,
        } = project;
        return (
          <li key={project_id} className={styles.listContainer}>
            <span className={styles.type}>{type}</span>
            <span className={styles.status}>{recruitmentStatus}</span>
            <p className={styles.title}>{title}</p>
            <p className={styles.summary}>{summary}</p>
            <ul className={styles.roleContainer}>
              {recruitmentRoles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
            <ul className={styles.stacksContainer}>
              {requiredStacks.map((stack, index) => (
                <li key={index}>{stack}</li>
              ))}
            </ul>
            <span className={styles.goal}>{goal}</span>
            <span className={styles.participationTime}>{participationTime}</span>
            <span className={styles.bookmarkCount}>{bookmarkCount}</span>
          </li>
        );
      })}
    </ul>
  );
}
export default ProjectList;
