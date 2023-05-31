import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// component
import ProjectTitle from '../components/Project/ProjectTitle';
import ProjectBody from '../components/Project/ProjectBody';
import ProjectAuthorProfile from '../components/Project/ProjectAuthorProfile';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // 각 컴포넌트 데이터
  const [titleData, setTitleData] = useState<ProjectType.TypeProjectTitle | null>(null);
  const [bodyData, setBodyData] = useState<ProjectType.TypeProjectBody | null>(null);
  const [authorData, setAuthorData] = useState<ProjectType.TypeProjectAuthor | null>(null);
  const [bookmarksData, setBookmarksData] = useState<ProjectType.TypeProjectBookmarks | null>(null);
  const [modifyData, setModifyData] = useState<ProjectType.TypeProjectModify | null>(null);

  // 데이터 API 호출 함수
  const fetchData = async () => {
    try {
      const data: ProjectType.TypeProject = await Fetcher.getProject(projectId);
      setProjectData(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 아이디에 맞게 로딩할 것
  useEffect(() => {
    fetchData();
  }, []);

  // 데이터가 로딩되면 각 props데이터 할당함
  useEffect(() => {
    setTitleData(() => {
      return projectData
        ? {
            project_type: projectData.project_type,
            project_recruitment_status: projectData.project_recruitment_status,
            project_title: projectData.project_title,
            project_created_at: projectData.project_created_at,
            project_comments: projectData.project_comments,
            project_views: projectData.project_views,
          }
        : null;
    });
    setBodyData(() => {
      return projectData
        ? {
            project_summary: projectData.project_summary,
            project_recruitment_roles: projectData.project_recruitment_roles,
            project_required_stacks: projectData.project_required_stacks,
            project_goal: projectData.project_goal,
            project_participation_time: projectData.project_participation_time,
            project_introduction: projectData.project_introduction,
          }
        : null;
    });
    setAuthorData(() => {
      return projectData
        ? {
            author_id: projectData.author_id,
            author_name: projectData.author_name,
            author_introduction: projectData.author_introduction,
            author_img: projectData.author_img,
          }
        : null;
    });
    setBookmarksData(() => {
      return projectData
        ? {
            project_bookmarks: { bookmarkList: projectData.project_bookmarks.bookmarkList },
          }
        : null;
    });
    setModifyData(() => {
      return projectData
        ? {
            project_id: projectData.project_id,
            project_recruitment_status: projectData.project_recruitment_status,
          }
        : null;
    });
  }, [projectData]);

  return projectData ? (
    <>
      <div>
        <ProjectTitle titleData={titleData} />
        <ProjectBody bodyData={bodyData} />
      </div>
      <div>
        <ProjectAuthorProfile authorData={authorData} />
        <ProjectBookmarkBlock bookmarksData={bookmarksData} />
        <ProjectModifyBlock modifyData={modifyData} />
      </div>
    </>
  ) : (
    <>
      <div>{isLoading ? '로딩중입니다.' : error}</div>
    </>
  );
}

export default Project;
