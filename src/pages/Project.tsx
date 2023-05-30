import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// component
import ProjectTitle from '../components/Project/ProjectTitle';
import ProjectBody from '../components/Project/ProjectBody';
import ProjectUserProfile from '../components/Project/ProjectUserProfile';
import ProjectBookmarkBlock from '../components/Project/ProjectBookmarkBlock';
import ProjectModifyBlock from '../components/Project/ProjectModifyBlock';
// data 관련
import * as Fetcher from '../apis/Fetcher';
import * as ProjectType from '../interfaces/Project.interface';

function Project() {
  // params 확인
  const params: { [key: string]: string | undefined } = useParams();
  // 게시글 데이터
  const projectId: number = params.id ? Number(params.id) : 0;
  const [projectData, setProjectData] = useState<ProjectType.TypeProject | null>(null);

  // 게시글 아이디에 맞게 로딩할 것
  /*
  useEffect(() => {
    async () => {
      try {
        const data: ProjectType.TypeProject = await Fetcher.getProject(projectId);
        setProjectData(data);
      } catch (error) {
        alert(error);
      }
    };
  }, []);
  */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProjectType.TypeProject = await Fetcher.getProject(projectId);
        setProjectData(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  if (!projectData)
    return (
      <>
        <div>로딩중입니다.</div>
      </>
    );
  else {
    console.log(projectData);
  }

  return (
    <>
      {/*
      <div>
        <ProjectTitle titleData={titleData} />
        <ProjectBody bodyData={projectData} />
      </div>
      <div>
        <ProjectUserProfile authorData={projectData} />
        <ProjectBookmarkBlock bookmarkData={projectData} />
        <ProjectModifyBlock modifyData={projectData} />
      </div>
      */}
    </>
  );
}

export default Project;
