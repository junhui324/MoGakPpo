import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// component
import ProjectTitle from '../components/ProjectTitle';
import ProjectBody from '../components/ProjectBody';
import ProjectUserProfile from '../components/ProjectUserProfile';
import ProjectBookmarkBlock from '../components/ProjectBookmarkBlock';
import ProjectModifyBlock from '../components/ProjectModifyBlock';

function Project() {
  const params: { [key: string]: string | undefined } = useParams();
  const navigate = useNavigate();

  // :id가 존재하지 않으면 루트페이지로 이동. 단, App.tsx의 라우팅 부분에서 걸러질 것임.
  if (params.id) {
    const projectId: string = params.id;
    return (
      <>
        <div>
          <ProjectTitle projectId={projectId} />
          <ProjectBody projectId={projectId} />
        </div>
        <div>
          <ProjectUserProfile projectId={projectId} />
          <ProjectBookmarkBlock projectId={projectId} />
          <ProjectModifyBlock projectId={projectId} />
        </div>
      </>
    );
  } else {
    navigate('/');
    return <div>프로젝트를 찾지 못했습니다.</div>;
  }
}

export default Project;
