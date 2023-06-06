import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { getUserBookmarks } from '../../apis/Fetcher';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';
import Pagination from '../../components/Pagination';
import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';

function BookMarks() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserPosts>([]);
  const getUserBookmarkData = async () => {
    try {
      const userBookmarksData = await getUserBookmarks();
      setProjects(userBookmarksData.data.user_projects);
      setTotalPageCount(userBookmarksData.data.user_projects.length);
    } catch (error) {
      console.error('유저가 작성한 포스팅을 가져오지 못했어요');
    } finally {
      setIsLoading(false);
    }
  };

  const PER_PAGE = 5; // 한 페이지당 표시할 게시글 개수

  // 현재 페이지에 해당하는 게시글들을 자르기
  const getCurrentPageBookmarks = () => {
    const startIndex = currPage * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return projects.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getUserBookmarkData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>게시글 {projects.length}개</div>
      <div className={styles.posts}>
        <ul>
          {isLoading && <LoadingProject />}
          {projects.length > 0 &&
            !isLoading &&
            getCurrentPageBookmarks().map((post) => {
              const {
                project_id,
                project_type,
                project_recruitment_status,
                project_title,
                project_goal,
                project_participation_time,
                project_bookmark_count,
                project_comments_count,
                project_views_count,
                project_created_at,
              } = post;

              const newProjectData = {
                project_id,
                project_type,
                project_recruitment_status,
                project_title,
                project_goal,
                project_participation_time,
                project_bookmark_count,
                project_comments_count,
                project_views_count,
                project_created_at,
              };

              return (
                <div key={post.project_id}>
                  <span className={styles.postType} onClick={() => navigate(ROUTES.PROJECT_LIST)}>
                    프로젝트
                  </span>
                  <Project projectData={newProjectData} />
                </div>
              );
            })}
          {projects.length === 0 && !isLoading && (
            <div className={styles.noContentContainer}>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 북마크한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
        {projects.length > 0 && !isLoading &&
          <Pagination
            currPage={currPage}
            onClickPage={setCurrPage}
            pageCount={Math.ceil(totalPageCount / PER_PAGE)}
          />
        }
      </div>
    </div>
  );
}

export default BookMarks;
