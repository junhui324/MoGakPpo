import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectPreview.module.scss';
import ProjectTitle from '../Project/ProjectTitle';
import ProjectBody from '../Project/ProjectBody';
import * as ProjectType from '../../interfaces/Project.interface';
import * as Fetcher from '../../apis/Fetcher';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  projectState,
  classificationState,
  projectIdState,
  modifyButtonClickState,
} from '../../recoil/projectState';

function ProjectPreview() {
  const [project, setProject] = useRecoilState(projectState);
  const classification = useRecoilValue(classificationState);
  const projectId = useRecoilValue(projectIdState);
  const [modifyButtonClick, setModifyButtonClick] = useRecoilState(modifyButtonClickState);
  const resetProject = useResetRecoilState(projectState);
  const [titleData, setTitleData] = useState<any>(null);
  const [bodyData, setBodyData] = useState<ProjectType.TypeProjectBody | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(project);
    setTitleData(() => {
      return {
        project_type: project.project_type,
        project_recruitment_status: 'RECRUITING',
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
    // 체크 버튼, 라디오 버튼 초기화
    setProject((prevProject) => {
      return {
        ...prevProject,
        project_recruitment_roles: { roleList: [] },
        project_participation_time: '',
        project_goal: '',
      };
    });

    // 게시글 작성 페이지로 다시 돌아갈 수 있도록 주소 저장
    let pType = '';
    if (classification === 'create') {
      if (project.project_type === 'PROJECT') {
        pType = 'project';
      } else if (project.project_type === 'STUDY') {
        pType = 'study';
      }
      setModifyButtonClick(true);
      navigate(`/create/${pType}`);
    } else if (classification === 'modify') {
      navigate(`/modify`);
    }
  };

  const handleSubmitButton = () => {
    if (classification === 'create') {
      (async () => {
        const res = await postProject();
        resetProject();
        //console.log('res: ', res);
        navigate(`/project/${res}`);
      })();
    } else if (classification === 'modify') {
      (async () => {
        const res = await patchProject();
        //console.log('res: ', res);
        navigate(`/project/${res}`);
      })();
    }
  };

  //백엔드에 게시물 데이터 전송하는 POST 함수
  const postProject = async () => {
    try {
      const res = await Fetcher.postProject(project);
      return res.data.project_id;
    } catch (error) {
      console.log(`POST 요청 에러 : ${error}`);
    }
  };

  //백엔드에 게시물 데이터 전송하는 PATCH 함수
  const patchProject = async () => {
    try {
      const res = await Fetcher.patchProject(project, projectId);
      return res.data.project_id;
    } catch (error) {
      console.log(`PATCH 요청 에러 : ${error}`);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <ProjectTitle titleData={titleData} />
          <ProjectBody bodyData={bodyData} />
        </div>
        <div className={styles.rightContainer}>
          <button
            className={`${styles.modify} ${classification === 'modify' ? styles.modifyTrue : ''}`}
            onClick={handleModifyButton}
          >
            프로젝트 편집
          </button>
          <button className={styles.submit} onClick={handleSubmitButton}>
            등록하기
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectPreview;
