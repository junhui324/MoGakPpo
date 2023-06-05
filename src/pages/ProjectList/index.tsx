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
import useIntersect from '../../hooks/useIntersect';

function ProjectListMain() {
  // const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [keywordValue, setKeywordValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isRecruitingFiltered, setIsRecruitingFiltered] = useState(false);

  const { setRef, pageCount } = useIntersect({
    onIntersect: async (
      entry: { target: any },
      observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }
    ) => {
      console.log('use', pageCount);
      observer.unobserve(entry.target);
      observer.observe(entry.target);
      getProjectListData(pageCount);
    },
    option: {},
  });

  // 관찰 => 관찰됨 상태 true => 새로운 페이지 +기존 페이지 => 관찰됨 상태 false => 새로운 데이터 마지막 리스트 관찰

  const getProjectListData = useCallback(
    async (pageCount = 0): Promise<void> => {
      console.log(pageCount);
      try {
        if (pageCount === 0 && !isRecruitingFiltered) {
          const projectList =
            selectedCategory === 'ALL'
              ? await getProjects()
              : await getProjectsByCategory(`"${selectedCategory}"`);
          setProjectList(projectList.data);
          setIsLoading(true);
          // setPageCount((prev) => prev + 1);
        } else if (pageCount > 0) {
          const newPageData = await getProjectsPage(pageCount);
          setProjectList((prev) => [...prev, ...newPageData.data]);
        } else if (isRecruitingFiltered) {
          const projectList = await getRecruitingProjects(selectedCategory);
          setProjectList(projectList.data);
          setIsLoading(true);
        }
      } catch (error) {
        console.error('포스팅을 가져오지 못했어요');
      }
    },
    [isRecruitingFiltered, selectedCategory]
  );

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
  };

  const handleSearchChange = (keyword: string) => {
    setKeywordValue(keyword);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(keywordValue);
    keywordValue && getSearchListData();
    if (keywordValue) {
      setIsSearched(true);
    } else if (isSearched && !keywordValue) {
      setIsSearched(false);
      getProjectListData();
    }
  };

  const handleSearchCancelClick = () => {
    setIsSearched(false);
    getProjectListData();
    setKeywordValue('');
  };

  const handleRecruitingFilterCheck = () => {
    setIsRecruitingFiltered((prev) => !prev);
  };

  useEffect(() => {
    getProjectListData();
  }, [getProjectListData]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.leftContentContainer}>
          <Category selectedCategory={selectedCategory} handleClick={handleCategoryClick} />
          <ProjectPostButton />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <ProjectSearch
          handleSubmit={handleSearchSubmit}
          handleChange={handleSearchChange}
          value={keywordValue}
          searchKeyword={searchKeyword}
          isSearched={isSearched}
          handleSearchCancelClick={handleSearchCancelClick}
        />
        <RecruitingProjectFilter
          isFilterChecked={isRecruitingFiltered}
          onChange={handleRecruitingFilterCheck}
        />
        <ProjectList innerRef={setRef} projectList={projectList} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default ProjectListMain;
