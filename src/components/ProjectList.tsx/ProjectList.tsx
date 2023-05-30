import { useEffect, useState } from 'react';
import { getProjectList } from '../../apis/project';
import { TypeProjectList } from '../../interfaces/Project.interface';

function ProjectList() {
  const [projectList, setProjectList] = useState<TypeProjectList[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const projectList = await getProjectList();
        setProjectList(projectList);
        console.log(projectList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {projectList.map((project) => {
        return <li key={project.project_id}>{project.project_type}</li>;
      })}
    </ul>
  );
}
export default ProjectList;
