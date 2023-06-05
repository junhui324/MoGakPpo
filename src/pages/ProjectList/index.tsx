import { useCallback, useEffect, useState } from 'react';
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

function ProjectListMain() {
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [keywordValue, setKeywordValue] = useState('');
  // const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isRecruitingFiltered, setIsRecruitingFiltered] = useState(false);

  const getProjectListData = useCallback(async (): Promise<void> => {
    try {
      if (!isRecruitingFiltered) {
        const projectList =
          selectedCategory === 'ALL'
            ? await getProjects()
            : await getProjectsByCategory(`"${selectedCategory}"`);
        setProjectList(projectList.data);
        setIsLoading(true);
      } else if (isRecruitingFiltered) {
        const projectList = await getRecruitingProjects(selectedCategory);
        setProjectList(projectList.data);
        setIsLoading(true);
      }
    } catch (error) {
      console.error('포스팅을 가져오지 못했어요');
    }
  }, [isRecruitingFiltered, selectedCategory]);

  const getSearchListData = async () => {
    try {
      const projectList = await getProjectsByKeyword(selectedCategory, keywordValue.toLowerCase());
      //console.log(projectList.data);
      setProjectList(projectList.data);
    } catch (error) {
      console.error('포스팅을 가져오지 못했어요');
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keywordValue.length > 0) {
        getSearchListData();
        setIsSearched(true);
      }
      if (keywordValue.length === 0) {
        setIsSearched(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [keywordValue]);

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
  };

  const handleSearchChange = (keyword: string) => {
    setKeywordValue(keyword);
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
        <ProjectList projectList={projectList} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default ProjectListMain;
