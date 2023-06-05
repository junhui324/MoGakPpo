import { useEffect, useRef } from 'react';

import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';
import Project from './Project';
import LoadingProject from './LoadingProject';

interface ProjectListProps {
  projectList: TypeProjectList[];
  isLoading: boolean;
  innerRef: any;
}
function ProjectList({ projectList, isLoading, innerRef }: ProjectListProps) {
  return (
    <ul className={styles.container}>
      {!isLoading && <LoadingProject />}
      {isLoading && projectList.length > 0 ? (
        projectList.map((project, index) =>
          index === projectList.length - 1 ? (
            <Project projectData={project} key={project.project_id} innerRef={innerRef} />
          ) : (
            <Project projectData={project} key={project.project_id} />
          )
        )
      ) : isLoading && projectList.length === 0 ? (
        <li className={styles.noneContentContainer}>
          <p className={styles.noneContent}>게시글이 없습니다 :(</p>
        </li>
      ) : undefined}
    </ul>
  );
}
export default ProjectList;
