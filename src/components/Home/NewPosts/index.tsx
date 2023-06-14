import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects } from '../../../apis/Fetcher';
import { TypeProjectList } from '../../../interfaces/Project.interface';
import styles from './NewPosts.module.scss';
import { getIsNew } from '../../../utils/getIsNew';
import { IoIosArrowForward } from 'react-icons/io';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ROUTES from '../../../constants/Routes';

export default function NewPosts() {
  const navigate = useNavigate();
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

  const totalItems = Math.ceil(projectList.length / 2);

  const handleBack = () => {
    setCurrentId((curr) => (curr === 0 ? totalItems - 1 : curr - 1));
  };

  const handleNext = () => {
    setCurrentId((curr) => (curr === totalItems - 1 ? 0 : curr + 1));
  };
  const changeRoleName = (role: string) => {
    switch (role) {
      case 'BACK': {
        return '백엔드';
      }
      case 'FRONT': {
        return '프론트엔드';
      }
      case 'PM': {
        return '기획';
      }
      case 'DESIGN': {
        return '디자인';
      }
      case 'ROLE_ETC': {
        return '기타';
      }
    }
  };
  return (
    <div className={styles.newPosts}>
      <div className={styles.titleContainer}>
        <div className={styles.titleTextWrapper}>
          <h1>새로운 모집 글</h1>
          <p>새로 업데이트된 모집글을 확인해보세요!</p>
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.arrowButton}>
          <button onClick={handleBack} disabled={currentId === 0 ? true : false}>
            <BsArrowLeft />
          </button>
          <button onClick={handleNext} disabled={currentId === totalItems - 1 ? true : false}>
            <BsArrowRight />
          </button>
        </div>
        <button className={styles.toAllButton} onClick={() => navigate(`${ROUTES.PROJECT}`)}>
          모두 보기 <IoIosArrowForward />
        </button>
      </div>
      <div className={styles.slideArea}>
        <div className={styles.projectList} style={move}>
          {projectList && projectList.length > 0 ? (
            projectList.map((project) => (
              <Link to={`/projects/${project.project_id}`} key={project.project_id}>
                <div className={styles.projectContainer}>
                  <div className={styles.project}>
                    <span className={styles.type}>{project.project_type}</span>
                    <span className={styles.goal}>{project.project_goal}</span>
                    <div className={styles.titleWrapper}>
                      <h1 className={styles.title}>{project.project_title}</h1>
                      {getIsNew(project.project_created_at) && (
                        <span className={styles.newTag}>NEW</span>
                      )}
                    </div>
                    <h3 className={styles.summary}>{project.project_summary}</h3>
                    <div className={styles.role}>
                      {project.project_recruitment_roles?.roleList?.map((role, index) => (
                        <p key={`${role}-${index}`}>{changeRoleName(role)}</p>
                      ))}
                    </div>
                    <div className={styles.viewWrapper}>
                      <span>👀</span>
                      <span className={styles.count}>{project.project_views_count}</span>
                      <span>💬</span>
                      <span className={styles.count}>{project.project_comments_count}</span>
                      <span>📌</span>
                      <span className={styles.count}>{project.project_bookmark_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noContent}>
              아직 등록 된 포스트가 없어요🥲 <br />
              새로운 포스트를 작성 해 보세요:)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
