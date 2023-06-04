import { useCallback, useEffect, useState } from 'react';
import { getProjects, getProjectsByCategory, getProjectsByKeyword } from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/common/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './ProjectListMain.module.scss';

function ProjectListMain() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [keywordValue, setKeywordValue] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const getProjectListData = useCallback(async (): Promise<void> => {
    try {
      const projectList =
        selectedCategory === 'ALL'
          ? await getProjects()
          : await getProjectsByCategory(`"${selectedCategory}"`);
      setProjectList(projectList.data);
    } catch (error) {
      console.error('포스팅을 가져오지 못했어요');
    }
  }, [selectedCategory]);

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
        {projectList.length > 0 ? (
          <ProjectList projectList={projectList} />
        ) : (
          <div className={styles.noneContentContainer}>
            <p className={styles.noneContent}>게시글이 없습니다 :(</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectListMain;
