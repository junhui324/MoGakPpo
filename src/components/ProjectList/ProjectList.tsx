import { useEffect, useState } from 'react';
import { getProjects } from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';

function ProjectList() {
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const projectList = await getProjects();
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
            <div>
              <div>
                <span className={styles.type}>{type}</span>
                <span className={styles.goal}>{goal}</span>
              </div>
              {participationTime && (
                <span className={styles.participationTime}>{participationTime}</span>
              )}
            </div>
            <div>
              <span
                className={`${styles.status} ${
                  recruitmentStatus === '모집 중'
                    ? styles.recruiting
                    : recruitmentStatus === '모집 완료'
                    ? styles.done
                    : ''
                }`}
              >
                {recruitmentStatus}
              </span>
              <p className={styles.title}>{title}</p>
            </div>
            <p className={styles.summary}>{summary}</p>
            <ul className={styles.roleContainer}>
              {recruitmentRoles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
            {requiredStacks && (
              <ul className={styles.stacksContainer}>
                <span>기술스택</span>
                {requiredStacks.map((stack, index) => (
                  <li key={index}>{stack}</li>
                ))}
              </ul>
            )}

            {(bookmarkCount > 0 || commentsCount > 0 || viewsCount > 0) && (
              <ul className={styles.countContainer}>
                {bookmarkCount > 0 ? (
                  <li>
                    <span>북마크</span>
                    <span className={styles.bookmarkCount}>{bookmarkCount}</span>
                  </li>
                ) : undefined}
                {commentsCount > 0 ? (
                  <li>
                    <span>코멘트</span>
                    <span className={styles.commentsCount}>{commentsCount}</span>
                  </li>
                ) : undefined}
                {viewsCount > 0 ? (
                  <li>
                    <span>조회수</span>
                    <span className={styles.viewsCount}>{viewsCount}</span>
                  </li>
                ) : undefined}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
export default ProjectList;
