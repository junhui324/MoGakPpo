import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';
import Project from './Project';
import LoadingProject from './LoadingProject';

interface ProjectListProps {
  projectList: TypeProjectList[];
  isLoading: boolean;
  innerRef?: any;
  moreData?: boolean;
}
function ProjectList({ projectList, isLoading, innerRef, moreData }: ProjectListProps) {
  return (
    <ul className={styles.container}>
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
