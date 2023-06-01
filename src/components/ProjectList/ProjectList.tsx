import { TypeProjectList } from '../../interfaces/Project.interface';
import styles from './ProjectList.module.scss';
import Project from './Project';

interface ProjectListProps {
  projectList: TypeProjectList[];
}
function ProjectList({ projectList }: ProjectListProps) {
  return (
    <ul className={styles.container}>
      {projectList.map((project) => (
        <Project projectData={project} />
      ))}
    </ul>
  );
}
export default ProjectList;
