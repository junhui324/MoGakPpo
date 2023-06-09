import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { getUserBookmarks, getUserSelectBookMarks } from '../../apis/Fetcher';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import Project from '../../components/ProjectList/Project';
import LoadingProject from '../../components/ProjectList/LoadingProject';
import Pagination from '../../components/Pagination';
import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import ContentsFilter from './ContentsFilter';

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
  const [recruitingFilter, setRecruitingFilter] = useState('all');

  const offset = currPage + 1;

  // 전체 북마크 불러오던 함수
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
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserSelectData = async () => {
    try {
      const userPostsData = await getUserSelectBookMarks(recruitingFilter, offset);
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
    // getUserBookmarkData();
    getUserSelectData();
  }, [recruitingFilter, currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>북마크 {totalLength}개</div>
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
