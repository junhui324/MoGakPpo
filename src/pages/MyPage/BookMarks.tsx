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

interface BookMarksProps {
  onError: (errorMessage: string) => void;
}

function BookMarks({ onError }: BookMarksProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserPosts>([]);

  const offset = currPage + 1;
  const getUserBookmarkData = async () => {
    try {
      const userBookmarksData = await getUserBookmarks(offset);
      setTotalLength(userBookmarksData.data.listLength);
      setProjects(userBookmarksData.data.pagenatedProjects);
      setTotalPageCount(userBookmarksData.data.pageSize);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
          default:
            onError('알 수 없는 오류가 발생했습니다.');
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserBookmarkData();
  }, [currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>북마크 {totalLength}개</div>
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
              <div className={styles.noContent}>아직 북마크한 게시글이 없어요.</div>
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

export default BookMarks;
