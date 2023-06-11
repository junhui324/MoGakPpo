import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserProjectPosts } from '../../interfaces/Project.interface';
import { TypeUserPortfolioPosts } from '../../interfaces/Portfolio.interface';
import { getUserProjectPosts, getUserPortfolioPosts } from '../../apis/Fetcher';
import Pagination from '../../components/Pagination';
import Project from './Project';
import PortFolio from './Portfolio';
import ContentsFilter from './ContentsFilter';

interface PostsProps {
  onError: (errorMessage: string) => void;
}

function Posts({ onError }: PostsProps) {
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<TypeUserProjectPosts>([]);
  const [portfolios, setPortfolios] = useState<TypeUserPortfolioPosts>([]);
  const [selectedOption, setSelectedOption] = useState('project');

  const offset = currPage + 1;

  const getUserProjectPostsData = async () => {
    try {
      switch(selectedOption) {
        case 'project': {
          const userPostsData = await getUserProjectPosts(offset);
          
          setTotalLength(userPostsData.data.listLength);
          setProjects(userPostsData.data.pagenatedProjects);
          setTotalPageCount(userPostsData.data.pageSize);
          break;
        }

        case 'portfolio': {
          const userPostsData = await getUserPortfolioPosts(offset);
          
          setTotalLength(userPostsData.data.listLength);
          setPortfolios(userPostsData.data.pagenatedPortfolios);
          setTotalPageCount(userPostsData.data.pageSize);
          break;
        }
      }
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
        }
      }
    }
  };

  const handleSelectFilter = (value: string) => {
    setSelectedOption(value);
    setCurrPage(0);
  };

  useEffect(() => {
    getUserProjectPostsData();
    setProjects([]);
    setPortfolios([]);
  }, [selectedOption , currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>게시글 {totalLength}개</div>
        <ContentsFilter onChange={handleSelectFilter}/>
      </div>
      <div className={styles.posts}>
        <ul>
          {totalLength > 0 && selectedOption === 'project' &&
            projects.map((data, index) => {
              return (
                <div key={index}>
                  <Project projectData={data} />
                </div>
              );
            })}
          {totalLength > 0 && selectedOption === 'portfolio' &&
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
