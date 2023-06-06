import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getProjects,
  getProjectsByCategory,
  getProjectsByKeyword,
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
  const [pageCount, setPageCount] = useState(1);
  // const [pageSize, ]
  const [moreData, setMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [keywordValue, setKeywordValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [recruitingFilter, setRecruitingFilter] = useState('all');

  const getProjectListData = async (): Promise<void> => {
    try {
      const projectList = await getProjects(
        selectedCategory,
        recruitingFilter,
        keywordValue,
        pageCount
      );
      setProjectList(projectList.data.pagenatedProjects);
    } catch (error) {
      setMoreData(false);
      console.error('포스팅을 가져오지 못했어요');
    } finally {
      setPageCount((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  const getNextProjectListData = async (): Promise<void> => {
    try {
      const projectList = await getProjects(
        selectedCategory,
        recruitingFilter,
        keywordValue,
        pageCount
      );
      const pageSize = projectList.data.pageSize;
      pageSize - 1 <= pageCount && setMoreData(false);
      setProjectList((prev) => [...prev, ...projectList.data.pagenatedProjects]);
      setPageCount((prev) => prev + 1);
    } catch (error) {
      setMoreData(false);
      console.error('포스팅을 가져오지 못했어요');
    } finally {
      setIsLoading(false);
    }
  };

  const target = useInfiniteScroll(async (entry, observer) => {
    moreData && (await getNextProjectListData());
  });

  const handleCategoryClick = async (key: string) => {
    setSelectedCategory(key);
    setKeywordValue('');
    setPageCount(1);
    setMoreData(true);
  };

  const handleSearchChange = (keyword: string) => {
    setSelectedCategory('all');
    setPageCount(1);
    setMoreData(true);
    setKeywordValue(keyword);
    if (keywordValue.length > 0) {
      setIsSearched(true);
    }
    if (keywordValue.length === 0) {
      setIsSearched(false);
    }
  };

  const handleRecruitingSelect = (value: string) => {
    setPageCount(1);
    setMoreData(true);
    setRecruitingFilter(value);
  };

  useEffect(() => {
    window.scroll(0, 0);
    getProjectListData();
  }, [selectedCategory, recruitingFilter, keywordValue]);

  useEffect(() => {
    if (isSearched === true) {
      setTimeout(() => {
        console.log(2);
        getProjectListData();
        window.scroll(0, 0);
      }, 1000);
    }
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
