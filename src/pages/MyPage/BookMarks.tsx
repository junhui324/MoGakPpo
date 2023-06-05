import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { getUserBookmarks } from '../../apis/Fetcher';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';

function BookMarks() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<TypeUserPosts>([]);
  const getUserBookmarkData = async () => {
    try {
      const userPostsData = await getUserBookmarks();
      setProjects(userPostsData.data.user_projects);
      setIsLoading(true);
    } catch (error) {
      console.error('유저가 작성한 포스팅을 가져오지 못했어요');
    }
  };

  useEffect(() => {
    getUserBookmarkData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>게시글 {projects.length}개</div>
      <div className={styles.posts}>
        <ul>
          {!isLoading && <LoadingProject />}
          {isLoading && projects.length > 0 ? (
            projects.map((post) => {
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
                  <span>프로젝트</span>
                  <Project projectData={newProjectData} />
                </div>
              );
            })
          ) : (
            <div className={styles.noContentContainer}>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 북마크한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BookMarks;
