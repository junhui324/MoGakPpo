import { useEffect, useState } from 'react';
import { getProjectList } from '../../apis/project';
import axios from 'axios';

interface Project {
  id: string;
  project_type: string;
  recruitment_status: string;
  title: string;
  summary: string;
  recruitment_role: string;
  required_stacks: string[];
  goal: string[];
  participation_time: string;
  created_at: string;
}

function ProjectList() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const projectList = await getProjectList();
        setProjectList(projectList.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {projectList.map((project) => {
        return <li key={project.id}>{project.project_type}</li>;
      })}
    </ul>
  );
}
export default ProjectList;
