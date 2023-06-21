import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';
import Project from './Project';
import LoadingProject from './LoadingProject';
import { RefObject } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ProjectListProps {
  projectList: TypeProjectList[];
  isLoading: boolean;
  innerRef?: RefObject<HTMLElement | HTMLLIElement>;
  moreData?: boolean;
}
function ProjectList({ projectList, isLoading, innerRef, moreData }: ProjectListProps) {
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  return (
    <ul
      className={
        !isMobile ? `${styles.container}` : `${styles.container} ${styles.mobileContainer}`
      }
    >
      {isLoading && <LoadingProject />}
      {!isLoading && projectList.length > 0 ? (
        projectList.map((project, index) =>
          index === projectList.length - 1 ? (
            <Project projectData={project} key={project.project_id} />
          ) : (
            <Project projectData={project} key={project.project_id} />
          )
        )
      ) : !isLoading && projectList.length === 0 ? (
        <li className={styles.noneContentContainer}>
          <p className={styles.noneContent}>게시글이 없습니다 :(</p>
        </li>
      ) : undefined}
      {projectList.length >= 10 && moreData && <LoadingProject innerRef={innerRef} />}
    </ul>
  );
}
export default ProjectList;
