import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// component
import ProjectTitle from '../components/ProjectTitle';
import ProjectBody from '../components/ProjectBody';
import ProjectUserProfile from '../components/ProjectUserProfile';
import ProjectBookmarkBlock from '../components/ProjectBookmarkBlock';
import ProjectModifyBlock from '../components/ProjectModifyBlock';

// 타입 수정 필요
interface Project {}

function Project() {
  // params 확인
  const params: { [key: string]: string | undefined } = useParams();
  // 게시글 데이터
  const projectId: number = params.id ? Number(params.id) : 0;
  const [projectData, setProjectData] = useState(null);

  // 게시글 아이디에 맞게 로딩할 것
  useEffect(() => {
    try {
      fetch('../../mock/data.json')
        .then((response) => response.json())
        .then((data) => {
          setProjectData(() => data.study.filter((post: Project) => post.study_id === projectId));
        });
      console.log(projectData);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <>
      <div>
        <ProjectTitle projectData={projectData} />
        <ProjectBody projectData={projectData} />
      </div>
      <div>
        <ProjectUserProfile projectData={projectData} />
        <ProjectBookmarkBlock projectData={projectData} />
        <ProjectModifyBlock projectData={projectData} />
      </div>
    </>
  );
}

export default Project;
