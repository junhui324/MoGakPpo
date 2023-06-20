import { RefObject, useCallback, useEffect } from 'react';
import { getProjects } from '../../apis/Fetcher';
import Category from '../../components/ProjectList/Category';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectPostButton from '../../components/common/ProjectPostButton';
import ProjectSearch from '../../components/ProjectList/ProjectSearch';
import styles from './ProjectListMain.module.scss';
import RecruitingProjectFilter from '../../components/ProjectList/RecruitingProjectFilter';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { projectListAtom } from '../../recoil/projectListFilter';
import { useMediaQuery } from 'react-responsive';

function ProjectListMain() {
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  const [projectListState, setProjectListState] = useRecoilState(projectListAtom);
  const setClassification = useSetRecoilState(classificationState);

  const getProjectListData = useCallback(
    async (nextPage: number): Promise<void> => {
      const { projectList, selectedCategory, keywordValue, recruitingFilter } = projectListState;

      try {
        const response = await getProjects(
          selectedCategory,
          recruitingFilter,
          keywordValue,
          nextPage
        );
        const { pagenatedProjects, pageSize } = response.data;
        const updatedProjectList =
          nextPage > 1 ? [...projectList, ...pagenatedProjects] : pagenatedProjects;

        setProjectListState((prevState) => ({
          ...prevState,
          isLoading: false,
          projectList: updatedProjectList,
          pageSize: pageSize,
          moreData: pageSize > nextPage,
        }));
      } catch (error: any) {
        if (error.message === '404') {
          setProjectListState((prevState) => ({
            ...prevState,
            isLoading: false,
            projectList: [],
            moreData: false,
          }));
        }
      }
      // finally {
      //   setIsLoading(false);
      // }
    },
    [
      projectListState.selectedCategory,
      projectListState.recruitingFilter,
      projectListState.keywordValue,
      projectListState.pageCount,
      projectListState.pageSize,
    ]
  );

  const target: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(
    async (entry, observer) => {
      //토탈 페이지 수의 페이지까지만 다음 페이지 데이터 업데이트하기
      if (projectListState.pageSize > projectListState.pageCount) {
        await getProjectListData(projectListState.pageCount + 1);
        setProjectListState((prev) => ({ ...prev, pageCount: prev.pageCount + 1 }));
      }
    }
  );

  useEffect(() => {
    const { isFirstFetch, isRefetch } = projectListState;
    if (isRefetch) {
      setProjectListState((prevState) => ({
        ...prevState,
        isRefetch: false,
      }));
    }
    if (isFirstFetch && !isRefetch) {
      window.scrollTo(0, 0);
      setClassification('/');
      setProjectListState((prevState) => ({
        ...prevState,
        isFirstFetch: false,
      }));
      getProjectListData(1);
    }
    // return () => {
    //   resetProjectListAtom();
    // };
  }, []);

  useEffect(() => {
    const { isFirstFetch, isRefetch } = projectListState;
    if (!isFirstFetch && !isRefetch) {
      window.scroll(0, 0);
      getProjectListData(1);
    }
  }, [projectListState.selectedCategory, projectListState.recruitingFilter]);

  useEffect(() => {
    const { isFirstFetch, isRefetch } = projectListState;
    if (!isFirstFetch && !isRefetch) {
      const delayDebounceFn = setTimeout(() => {
        window.scroll(0, 0);
        getProjectListData(1);
      }, 700); // 디바운스 타임 설정
      return () => clearTimeout(delayDebounceFn);
    }
  }, [projectListState.keywordValue]);

  const handleCategoryClick = async (key: string) => {
    setProjectListState((prevState) => ({
      ...prevState,
      selectedCategory: key,
      keywordValue: '',
      pageCount: 1,
      moreData: true,
    }));
  };

  const handleSearchChange = (keyword: string) => {
    setProjectListState((prevState) => ({
      ...prevState,
      selectedCategory: 'all',
      keywordValue: keyword,
      pageCount: 1,
      moreData: true,
    }));
  };

  const handleRecruitingSelect = (value: string) => {
    setProjectListState((prevState) => ({
      ...prevState,
      recruitingFilter: value,
      pageCount: 1,
      moreData: true,
    }));
  };

  return (
    <div
      className={!isMobile ? `${styles.container}` : `${styles.mobileContainer}`}
      style={{ maxWidth: 1024, margin: '0 auto' }}
    >
      <div className={styles.leftContainer}>
        <div className={styles.leftContentContainer}>
          <Category
            selectedCategory={projectListState.selectedCategory}
            handleClick={handleCategoryClick}
          />
          {!isMobile && <ProjectPostButton />}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.searchContainer}>
          <ProjectSearch handleChange={handleSearchChange} value={projectListState.keywordValue} />
          <RecruitingProjectFilter
            value={projectListState.recruitingFilter}
            onChange={handleRecruitingSelect}
          />
        </div>
        <ProjectList
          projectList={projectListState.projectList}
          isLoading={projectListState.isLoading}
          moreData={projectListState.moreData}
          innerRef={target}
        />
      </div>
      {isMobile && <ProjectPostButton />}
    </div>
  );
}

export default ProjectListMain;
