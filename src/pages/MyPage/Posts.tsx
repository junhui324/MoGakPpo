import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import { getUserPosts } from '../../apis/Fetcher';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';
import Pagination from '../../components/Pagination';

function Posts() {
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserPosts>([]);

  const getUserPostsData = async () => {
    try {
      const userPostsData = await getUserPosts();
      setProjects(userPostsData.data.user_projects);
      setIsLoading(true);
      setTotalPageCount(userPostsData.data.user_projects.length);
    } catch (error) {
      console.error('유저가 작성한 포스팅을 가져오지 못했어요');
    }
  };

  const PER_PAGE = 5; // 한 페이지당 표시할 게시글 개수

  // 현재 페이지에 해당하는 게시글들을 자르기
  const getCurrentPageProjects = () => {
    const startIndex = currPage * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return projects.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getUserPostsData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>게시글 {projects.length}개</div>
      <div className={styles.posts}>
        <ul>
          {!isLoading && <LoadingProject />}
          {isLoading && projects.length > 0 ? (
            getCurrentPageProjects().map((post) => {
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
            <div>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
        <Pagination
          currPage={currPage}
          onClickPage={setCurrPage}
          pageCount={Math.ceil(totalPageCount / PER_PAGE)}
        />
      </div>
    </div>
  );
}

export default Posts;
