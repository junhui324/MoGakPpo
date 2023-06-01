import { useEffect, useState } from 'react';
import { getProjects, getProjectsByCategory, getProjectsByKeyword } from '../../apis/Fetcher';
import { TypeProjectList } from '../../interfaces/Project.interface';
import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/common/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './Main.module.scss';

function Main() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
  };

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword && getSearchListData();
    setSearchKeyword('');
  };

  const getSearchListData = async () => {
    try {
      const data = await getProjectsByKeyword(selectedCategory, searchKeyword);
      setProjectList(data);
    } catch (error) {
      console.error('포스팅을 가져오지 못했어요');
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const projectList =
          selectedCategory === 'all'
            ? await getProjects()
            : await getProjectsByCategory(selectedCategory);
        setProjectList(projectList);
      } catch (error) {
        console.error('포스팅을 가져오지 못했어요');
      }
    };
    fetchData();
  }, [selectedCategory]);

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
          value={searchKeyword}
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

export default Main;
