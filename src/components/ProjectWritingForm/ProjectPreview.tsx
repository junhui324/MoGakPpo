import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../pages/Project/Project.module.scss';
import ProjectTitle from '../Project/ProjectTitle';
import ProjectBody from '../Project/ProjectBody';
import * as ProjectType from '../../interfaces/Project.interface';

import { useRecoilState, useRecoilValue } from 'recoil';
import { projectState } from '../../recoil/projectState';

function ProjectPreview() {
  const [projectData, setProjectData] = useState<ProjectType.TypeProject | null>(null);
  const project = useRecoilValue(projectState);
  const [titleData, setTitleData] = useState<any>(null);
  const [bodyData, setBodyData] = useState<ProjectType.TypeProjectBody | null>(null);
  const navigate = useNavigate();
  const [modifyButtonClick, setModifyButtonClick] = useState(false);

  useEffect(() => {
    console.log(project);
    setTitleData(() => {
      return {
        project_type: project.project_type,
        project_recruitment_status: '작성 중',
        project_title: project.project_title,
        project_created_at: '0',
        project_comments_count: 0,
        project_views_count: 0,
      };
    });
    setBodyData(() => {
      return {
        project_summary: project.project_summary,
        project_recruitment_roles: project.project_recruitment_roles,
        project_required_stacks: project.project_required_stacks,
        project_goal: project.project_goal,
        project_participation_time: project.project_participation_time,
        project_introduction: project.project_introduction,
      };
    });
  }, []);

  const handleModifyButton = () => {
    let pType = '';
    if (project.project_type === 'PROJECT') {
      pType = 'project';
    } else if (project.project_type === 'STUDY') {
      pType = 'study';
    }
    navigate(`/create/${pType}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <ProjectTitle titleData={titleData} />
          <ProjectBody bodyData={bodyData} />
        </div>
      </div>
      <div>
        <button onClick={handleModifyButton}>프로젝트 편집</button>
        <button>등록하기</button>
      </div>
    </>
  );
}

export default ProjectPreview;
