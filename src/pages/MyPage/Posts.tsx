import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import { getUserPosts } from '../../apis/Fetcher';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';
import Pagination from '../../components/Pagination';
import ContentsFilter from './ContentsFilter';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';

interface PostsProps {
  onError: (errorMessage: string) => void;
}

function Posts({ onError }: PostsProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserPosts>([]);
  const [recruitingFilter, setRecruitingFilter] = useState('all');

  const offset = currPage + 1;
  const getUserPostsData = async () => {
    try {
      const userPostsData = await getUserPosts(offset);
      setTotalLength(userPostsData.data.listLength);
      setProjects(userPostsData.data.pagenatedProjects);
      setTotalPageCount(userPostsData.data.pageSize);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecruitingSelect = (value: string) => {
    setRecruitingFilter(value);
  };

  useEffect(() => {
    getUserPostsData();
  }, [currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>게시글 {totalLength}개</div>
        <ContentsFilter onChange={handleRecruitingSelect}/>
      </div>
      <div className={styles.posts}>
        <ul>
          {isLoading && <LoadingProject />}
          {totalLength > 0 &&
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
          {totalLength === 0 && !isLoading && (
            <div className={styles.noContentContainer}>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
        {totalLength > 0 && !isLoading && (
          <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={totalPageCount} />
        )}
      </div>
    </div>
  );
}

export default Posts;
