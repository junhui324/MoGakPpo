import { LegacyRef, RefObject, useCallback, useEffect, useState } from 'react';
import { getProjects } from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/common/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './ProjectListMain.module.scss';
import RecruitingProjectFilter from '../../components/ProjectList/RecruitingProjectFilter';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

function ProjectListMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [moreData, setMoreData] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keywordValue, setKeywordValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [recruitingFilter, setRecruitingFilter] = useState('all');
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const getProjectListData = useCallback(
    async (isPagenation?: boolean): Promise<void> => {
      try {
        const projectList = await getProjects(
          selectedCategory,
          recruitingFilter,
          keywordValue,
          pageCount
        );
        if (isPagenation) {
          console.log('페이지네이션 실행');
          // 무한스크롤을 위한 다음 페이지 데이터 get
          pageSize <= pageCount && setMoreData(false);
          setProjectList((prev) => [...prev, ...projectList.data.pagenatedProjects]);
          setPageCount((prev) => prev + 1);
        } else {
          console.log('처음 데이터 가져오기 실행');
          // 카테고리/모집 중/검색어 필터 변경 시 새로운 데이터 get
          const pageSize = projectList.data.pageSize;
          setPageSize(pageSize);
          // 가져온 프로젝트 리스트 사이즈가 1일 경우 moreDat 컴포넌트 렌더링x
          pageSize <= 1 && setMoreData(false);
          setProjectList(projectList.data.pagenatedProjects);
          setPageCount((prev) => prev + 1);
        }
      } catch (error: any) {
        if (error.message === '404') {
          setMoreData(false);
          setIsLoading(false);
          setProjectList([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory, recruitingFilter, keywordValue, pageCount, pageSize]
  );

  const target: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(
    async (entry, observer) => {
      //토탈 페이지 수의 페이지까지만 다음 페이지 데이터 업데이트하기
      pageSize >= pageCount && (await getProjectListData(true));
    }
  );

  useEffect(() => {
    setIsFirstFetch(false);
    getProjectListData();
  }, []);

  useEffect(() => {
    if (!isFirstFetch) {
      window.scroll(0, 0);
      getProjectListData();
    }
  }, [selectedCategory, recruitingFilter]);

  useEffect(() => {
    if (!isFirstFetch) {
      const delayDebounceFn = setTimeout(() => {
        window.scroll(0, 0);
        getProjectListData();
      }, 700); // 디바운스 타임 설정
      return () => clearTimeout(delayDebounceFn);
    }
  }, [keywordValue]);

  const handleCategoryClick = async (key: string) => {
    setSelectedCategory(key);
    setKeywordValue('');
    setPageCount(1);
    setMoreData(true);
  };

  const handleSearchChange = (keyword: string) => {
    setSelectedCategory('all');
    setKeywordValue(keyword);
    setPageCount(1);
    setMoreData(true);
    setIsSearched(true);
  };

  const handleRecruitingSelect = (value: string) => {
    setRecruitingFilter(value);
    setPageCount(1);
    setMoreData(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftContentContainer}>
          <Category selectedCategory={selectedCategory} handleClick={handleCategoryClick} />
          <ProjectPostButton />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.searchContainer}>
          <ProjectSearch
            handleChange={handleSearchChange}
            value={keywordValue}
            isSearched={isSearched}
          />
          <RecruitingProjectFilter onChange={handleRecruitingSelect} />
        </div>
        <ProjectList
          projectList={projectList}
          isLoading={isLoading}
          moreData={moreData}
          innerRef={target}
        />
      </div>
    </div>
  );
}

export default ProjectListMain;
