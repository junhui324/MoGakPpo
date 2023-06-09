// import { RefObject, useCallback, useEffect, useState } from 'react';
// import { getProjects } from '../../apis/Fetcher';
// import { TypeProjectList } from '../../interfaces/Project.interface';
// import Category from '../../components/ProjectList/Category';
// import ProjectList from '../../components/ProjectList/ProjectList';
// import ProjectPostButton from '../../components/common/ProjectPostButton';
// import ProjectSearch from '../../components/ProjectList/ProjectSearch';
// import styles from './ProjectListMain.module.scss';
// import RecruitingProjectFilter from '../../components/ProjectList/RecruitingProjectFilter';
// import useInfiniteScroll from '../../hooks/useInfiniteScroll';
// import { useSetRecoilState } from 'recoil';
// import { classificationState } from '../../recoil/projectState';
// function ProjectListMain() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
//   const [pageCount, setPageCount] = useState(1);
//   const [pageSize, setPageSize] = useState(0);
//   const [moreData, setMoreData] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [keywordValue, setKeywordValue] = useState('');
//   const [isSearched, setIsSearched] = useState(false);
//   const [recruitingFilter, setRecruitingFilter] = useState('all');
//   const [isFirstFetch, setIsFirstFetch] = useState(true);
//   const setClassification = useSetRecoilState(classificationState);

//   const getProjectListData = useCallback(
//     async (isPagenation?: boolean): Promise<void> => {
//       try {
//         const projectList = await getProjects(
//           selectedCategory,
//           recruitingFilter,
//           keywordValue,
//           pageCount
//         );
//         if (isPagenation) {
//           // 무한스크롤을 위한 다음 페이지 데이터 get
//           pageSize <= pageCount && setMoreData(false);
//           setProjectList((prev) => [...prev, ...projectList.data.pagenatedProjects]);
//           setPageCount((prev) => prev + 1);
//         } else {
//           // 카테고리/모집 중/검색어 필터 변경 시 새로운 데이터 get
//           const pageSize = projectList.data.pageSize;
//           setPageSize(pageSize);
//           // 가져온 프로젝트 리스트 사이즈가 1일 경우 moreData 컴포넌트 렌더링x
//           pageSize <= 1 && setMoreData(false);
//           setProjectList(projectList.data.pagenatedProjects);
//           setPageCount((prev) => prev + 1);
//         }
//       } catch (error: any) {
//         if (error.message === '404') {
//           setMoreData(false);
//           setIsLoading(false);
//           setProjectList([]);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [selectedCategory, recruitingFilter, keywordValue, pageCount, pageSize]
//   );

//   useEffect(() => {
//     // 이전 상태값 저장
//     const saveState = () => {
//       const stateToSave = {
//         selectedCategory,
//         keywordValue,
//         recruitingFilter,
//         pageCount,
//         projectList,
//       };
//       sessionStorage.setItem('projectListState', JSON.stringify(stateToSave));
//     };

//     // 이전 상태값 복원
//     const restoreState = () => {
//       const savedState = sessionStorage.getItem('projectListState');
//       if (savedState) {
//         const parsedState = JSON.parse(savedState);
//         setSelectedCategory(parsedState.selectedCategory);
//         setKeywordValue(parsedState.keywordValue);
//         setRecruitingFilter(parsedState.recruitingFilter);
//         setPageCount(parsedState.pageCount);
//         setProjectList(parsedState.projectList);
//       }
//     };

//     // 이전 상태값 저장
//     saveState();

//     // 뒤로가기 이벤트 리스너 등록
//     window.addEventListener('popstate', restoreState);

//     return () => {
//       // 뒤로가기 이벤트 리스너 해제
//       window.removeEventListener('popstate', restoreState);
//     };
//   }, []);

//   const target: RefObject<HTMLElement | HTMLLIElement> = useInfiniteScroll(
//     async (entry, observer) => {
//       //토탈 페이지 수의 페이지까지만 다음 페이지 데이터 업데이트하기
//       pageSize >= pageCount && (await getProjectListData(true));
//     }
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setIsFirstFetch(false);
//     setClassification('/');
//     getProjectListData();
//   }, []);

//   useEffect(() => {
//     if (!isFirstFetch) {
//       window.scroll(0, 0);
//       getProjectListData();
//     }
//   }, [selectedCategory, recruitingFilter]);

//   useEffect(() => {
//     if (!isFirstFetch) {
//       const delayDebounceFn = setTimeout(() => {
//         window.scroll(0, 0);
//         getProjectListData();
//       }, 700); // 디바운스 타임 설정
//       return () => clearTimeout(delayDebounceFn);
//     }
//   }, [keywordValue]);

//   const handleCategoryClick = async (key: string) => {
//     setSelectedCategory(key);
//     setKeywordValue('');
//     setPageCount(1);
//     setMoreData(true);
//   };

//   const handleSearchChange = (keyword: string) => {
//     setSelectedCategory('all');
//     setKeywordValue(keyword);
//     setPageCount(1);
//     setMoreData(true);
//     setIsSearched(true);
//   };

//   const handleRecruitingSelect = (value: string) => {
//     setRecruitingFilter(value);
//     setPageCount(1);
//     setMoreData(true);
//   };

//   return (
//     <div className={styles.container} style={{ maxWidth: 1024, margin: '0 auto' }}>
//       <div className={styles.leftContainer}>
//         <div className={styles.leftContentContainer}>
//           <Category selectedCategory={selectedCategory} handleClick={handleCategoryClick} />
//           <ProjectPostButton />
//         </div>
//       </div>
//       <div className={styles.rightContainer}>
//         <div className={styles.searchContainer}>
//           <ProjectSearch handleChange={handleSearchChange} value={keywordValue} />
//           <RecruitingProjectFilter value={recruitingFilter} onChange={handleRecruitingSelect} />
//         </div>
//         <ProjectList
//           projectList={projectList}
//           isLoading={isLoading}
//           moreData={moreData}
//           innerRef={target}
//         />
//       </div>
//     </div>
//   );
// }

// export default ProjectListMain;
export {};
