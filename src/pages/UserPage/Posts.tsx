import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { TypeUserProjectPosts } from '../../interfaces/Project.interface';
import { TypeUserPortfolioPosts } from '../../interfaces/Portfolio.interface';
import { getUserProjectPostsById, getUserPortfolioPostsById } from '../../apis/Fetcher';
import Pagination from '../../components/Pagination';
import Project from '../../components/ProjectList/Project';
import PortFolio from './Portfolio';
import { useParams, useNavigate } from 'react-router-dom';
import ContentsFilter from './ContentsFilter';

interface PostsProps {
  onError: (errorMessage: string) => void;
}
function Posts({ onError }: PostsProps) {
  const [totalLength, setTotalLength] = useState<number>(0);
  const params: { [key: string]: string | undefined } = useParams();
  const userId: number = params.id ? Number(params.id) : 0;
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserProjectPosts>([]);
  const [portfolios, setPortfolios] = useState<TypeUserPortfolioPosts>([]);
  const [selectedOption, setSelectedOption] = useState('project');
  const offset = useMemo(() => {
    return currPage + 1;
  }, [currPage]);
  const getUserProjectPostsData = useCallback(async () => {
    try {
      switch (selectedOption) {
        case 'project': {
          const userPostsData = await getUserProjectPostsById(userId, offset);
          //@ts-ignore
          setTotalLength(userPostsData.data.listLength);
          //@ts-ignore
          setProjects(userPostsData.data.pagenatedProjects);
          //@ts-ignore
          setTotalPageCount(userPostsData.data.pageSize);
          break;
        }

        case 'portfolio': {
          const userPostsData = await getUserPortfolioPostsById(userId, offset);

          //@ts-ignore
          setTotalLength(userPostsData.data.listLength);
          //@ts-ignore
          setPortfolios(userPostsData.data.pagenatedPortfolios);
          //@ts-ignore
          setTotalPageCount(userPostsData.data.pageSize);
          break;
        }
      }
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('유저가 작성한 포스팅을 가져오지 못했어요');
            break;
        }
      }
    }
  }, [selectedOption, onError, offset]);
  const handleSelectFilter = (value: string) => {
    setSelectedOption(value);
    console.log(value);
    setCurrPage(0);
  };
  useEffect(() => {
    getUserProjectPostsData();
    setProjects([]);
    setPortfolios([]);
  }, [getUserProjectPostsData]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>게시글 {totalLength}개</div>
        <ContentsFilter onChange={handleSelectFilter} />
      </div>
      <div className={styles.posts}>
        <ul>
          {totalLength > 0 &&
            selectedOption === 'project' &&
            projects.map((data, index) => {
              return (
                <div key={index}>
                  <Project projectData={data} />
                </div>
              );
            })}
          {totalLength > 0 &&
            selectedOption === 'portfolio' &&
            portfolios.map((data, index) => {
              return (
                <div key={index}>
                  <PortFolio portfolioData={data} />
                </div>
              );
            })}
          {totalLength === 0 && (
            <div className={styles.noContentContainer}>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
        {totalLength > 0 && (
          <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={totalPageCount} />
        )}
      </div>
    </div>
  );
}

export default Posts;
