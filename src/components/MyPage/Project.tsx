import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Token from '../../apis/Token';
import { deleteProjectBookmark, postProjectBookmark } from '../../apis/Fetcher';
import {
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_STATUS,
  PROJECT_TYPE,
} from '../../constants/project';
import { TypeProjectList } from '../../interfaces/Project.interface';
import ROUTES from '../../constants/Routes';
import { getIsNew } from '../../utils/getIsNew';
import getDateFormat from '../../utils/getDateFormat';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import styles from './project.module.scss';

interface projectDataProps {
  projectData: TypeProjectList;
}

function Project({ projectData }: projectDataProps) {
  const navigate = useNavigate();

  const {
    is_bookmarked: isBookmarked,
    project_id: projectId,
    project_type: type,
    project_recruitment_status: recruitmentStatus,
    project_title: title,
    project_summary: summary,
    project_goal: goal,
    project_participation_time: participationTime,
    project_created_at: createdAt,
  } = projectData;

  const [bookmark, setBookmark] = useState(isBookmarked);

  const handleBookmarkClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (Token.getToken()) {
      const updatedBookmark = !bookmark;
      setBookmark(updatedBookmark);
      try {
        updatedBookmark
          ? await postProjectBookmark(projectId)
          : await deleteProjectBookmark(projectId);
      } catch (error) {
        console.log(error);
      }
    } else {
      // 로그인 되어있지 않으면 alert을 띄워주고 로그인 페이지로 이동합니다.
      alert('로그인 후 사용 가능합니다.');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <li
      key={projectId}
      className={styles.listContainer}
      onClick={() => {
        navigate(`${ROUTES.PROJECT}${projectId}`);
      }}
    >
      <div>
        <div className={styles.topContainer}>
          <div>
            <span className={styles.type}>{PROJECT_TYPE[type]}</span>
            <span className={styles.goal}>{PROJECT_GOAL[goal]}</span>
          </div>
          <div>
            {participationTime && (
              <span className={styles.participationTime}>
                {PROJECT_PARTICIPATION_TIME[participationTime]}
              </span>
            )}
            {isBookmarked !== undefined && (
              <button className={styles.bookmarkButton} onClick={(e) => handleBookmarkClick(e)}>
                {bookmark ? <BsBookmarkFill /> : <BsBookmark />}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        <span
          className={`${styles.status} ${
            recruitmentStatus === 'RECRUITING'
              ? styles.recruiting
              : recruitmentStatus === 'COMPLETE'
              ? styles.done
              : ''
          }`}
        >
          {PROJECT_RECRUITMENT_STATUS[recruitmentStatus]}
        </span>
        <p className={styles.title}>{title}</p>
        {getIsNew(createdAt) && <span className={styles.newTag}>NEW</span>}
      </div>
      {summary && <p className={styles.summary}>{summary}</p>}{' '}
      <div className={styles.createdAt}>{getDateFormat(createdAt)}</div>
    </li>
  );
}

export default Project;
