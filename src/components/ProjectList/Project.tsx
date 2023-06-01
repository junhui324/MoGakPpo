import { TypeProjectList } from '@/interfaces/Project.interface';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import styles from './Project.module.scss';

interface projectDataProps {
  projectData: TypeProjectList;
}

function Project({ projectData }: projectDataProps) {
  const navigate = useNavigate();
  const isNewProject = (createdAt: string) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const createdAtDate = new Date(createdAt);
    return createdAtDate > threeDaysAgo;
  };

  const {
    project_id: projectId,
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
    project_views: viewsCount,
    project_created_at: createdAt,
  } = projectData;
  return (
    <li
      key={projectId}
      className={styles.listContainer}
      onClick={() => {
        navigate(`${ROUTES.PROJECT}${projectId}`);
      }}
    >
      <div>
        <div>
          <span className={styles.type}>{type}</span>
          <span className={styles.goal}>{goal}</span>
        </div>
        {participationTime && <span className={styles.participationTime}>{participationTime}</span>}
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
        {isNewProject(createdAt) && <span className={styles.newTag}>NEW</span>}
      </div>
      {summary && <p className={styles.summary}>{summary}</p>}{' '}
      {recruitmentRoles && (
        <ul className={styles.roleContainer}>
          {recruitmentRoles.roleList.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      )}
      {requiredStacks && (
        <ul className={styles.stacksContainer}>
          <span>기술스택</span>
          {requiredStacks.stackList.map((stack, index) => (
            <li key={index}>{stack}</li>
          ))}
        </ul>
      )}
      {(bookmarkCount > 0 || commentsCount > 0 || viewsCount > 0) && (
        <ul className={styles.countContainer}>
          {bookmarkCount > 0 ? (
            <li>
              <span>📌</span>
              <span className={styles.bookmarkCount}>{bookmarkCount}</span>
            </li>
          ) : undefined}
          {commentsCount > 0 ? (
            <li>
              <span>💬</span>
              <span className={styles.commentsCount}>{commentsCount}</span>
            </li>
          ) : undefined}
          {viewsCount > 0 ? (
            <li>
              <span>👀</span>
              <span className={styles.viewsCount}>{viewsCount}</span>
            </li>
          ) : undefined}
        </ul>
      )}
    </li>
  );
}

export default Project;
