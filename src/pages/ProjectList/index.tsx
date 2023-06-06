import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getProjects,
  getProjectsByCategory,
  getProjectsByKeyword,
  getProjectsPage,
  getRecruitingProjects,
} from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/common/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './ProjectListMain.module.scss';
import RecruitingProjectFilter from '../../components/ProjectList/RecruitingProjectFilter';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

function ProjectListMain() {
  const [pageCount, setPageCount] = useState(0);
  const [moreData, setMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [keywordValue, setKeywordValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isRecruitingFiltered, setIsRecruitingFiltered] = useState(false);

  //useCallback으로 바꿔보기
  const getProjectListData = async (): Promise<void> => {
    //페이지네이션 추가되면 getData 구조 바꾸기
    // try{
    //   const projectList=await getProject(selectedCategory, pageCount, isRecruitingFiltered, isSearched&&keywordValue)
    // }
    // projects?cate=front&page=1&recruiting=false&keyword=false
    // projects?cate=back&page=1&recruiting=true&keyword=웹

    try {
      if (pageCount === 0 && !isRecruitingFiltered) {
        const projectList =
          pageCount === 0 && !isRecruitingFiltered && selectedCategory === 'ALL'
            ? await getProjects()
            : await getProjectsByCategory(`"${selectedCategory}"`);
        setProjectList(projectList.data);
        setIsLoading(true);
        setPageCount((prev) => prev + 1);
      } else if (pageCount > 0) {
        const newPageData = await getProjectsPage(pageCount);
        setProjectList((prev) => [...prev, ...newPageData.data]);
        setPageCount((prev) => prev + 1);
      } else if (isRecruitingFiltered) {
        const projectList = await getRecruitingProjects(selectedCategory);
        setProjectList(projectList.data);
        setIsLoading(true);
      }
    } catch (error) {
      setMoreData(false);
      console.error('포스팅을 가져오지 못했어요');
    }
  };

  const target = useInfiniteScroll(async (entry, observer) => {
    await getProjectListData();
  });

  const getSearchListData = async () => {
    try {
      const projectList = await getProjectsByKeyword(selectedCategory, keywordValue.toLowerCase());
      //console.log(projectList.data);
      setProjectList(projectList.data);
    } catch (error) {
      console.error('포스팅을 가져오지 못했어요');
    }
  };

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
    setPageCount(0);
    setMoreData(true);
  };

  const handleSearchChange = (keyword: string) => {
    setKeywordValue(keyword);
  };

  const handleRecruitingFilterCheck = () => {
    setIsRecruitingFiltered((prev) => !prev);
  };

  // useEffect(() => {
  //   getProjectListData();
  // }, [selectedCategory, isRecruitingFiltered, pageCount]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keywordValue.length > 0) {
        getSearchListData();
        setIsSearched(true);
      }
      if (keywordValue.length === 0) {
        setIsSearched(false);
        getSearchListData();
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [keywordValue]);

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
          <RecruitingProjectFilter
            isFilterChecked={isRecruitingFiltered}
            onChange={handleRecruitingFilterCheck}
          />
        </div>
        <ProjectList
          projectList={projectList}
          isLoading={isLoading}
          moreData={moreData}
          innerRef={target}
        />

        <ProjectList projectList={projectList} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default ProjectListMain;
