import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserProjectPosts } from '../../interfaces/Project.interface';
import { getUserProjectPostsById } from '../../apis/Fetcher';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';

function Posts() {
  const navigate = useNavigate();
  const params: { [key: string]: string | undefined } = useParams();
  const userId: number = params.id ? Number(params.id) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserProjectPosts>([]);
  const getUserProjectPostsData = async () => {
    try {
      const userPostsData = await getUserProjectPostsById(userId, currPage + 1);
      //@ts-ignore
      setProjects(userPostsData.data.pagenatedProjects);
      //@ts-ignore
      setTotalPageCount(userPostsData.data.pageSize);
    } catch (error) {
      console.error('유저가 작성한 포스팅을 가져오지 못했어요');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProjectPostsData();
  }, [currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>게시글 {projects.length}개</div>
      <div className={styles.posts}>
        <ul>
          {isLoading && <LoadingProject />}
          {projects.length > 0 &&
            !isLoading &&
            projects.map((post) => {
              return (
                <div key={post.project_id}>
                  <span className={styles.postType} onClick={() => navigate(ROUTES.PROJECT_LIST)}>
                    프로젝트
                  </span>
                  <Project projectData={{ ...post }} />
                </div>
              );
            })}
          {projects.length === 0 && !isLoading && (
            <div className={styles.noContentContainer}>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
        {projects.length > 0 && !isLoading && (
          <Pagination
            currPage={currPage}
            onClickPage={setCurrPage}
            pageCount={Math.ceil(totalPageCount)}
          />
        )}
      </div>
    </div>
  );
}

export default Posts;
