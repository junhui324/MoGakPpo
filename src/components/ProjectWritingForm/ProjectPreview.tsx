import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectPreview.module.scss';
import ProjectTitle from '../Project/ProjectTitle';
import ProjectBody from '../Project/ProjectBody';
import * as ProjectType from '../../interfaces/Project.interface';
import * as Fetcher from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import * as Token from '../../apis/Token';

import { base64imgSrcParser, base64sToFiles, findBase64 } from '../../utils/base64Utils';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  projectState,
  classificationState,
  projectIdState,
  modifyButtonClickState,
} from '../../recoil/projectState';

const IMG_DOMAIN = process.env.REACT_APP_API_KEY;

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
    // 게시글 작성 페이지로 다시 돌아갈 수 있도록 주소 저장
    let pType = '';
    if (classification === 'create') {
      if (project.project_type === 'PROJECT') {
        pType = 'project';
      } else if (project.project_type === 'STUDY') {
        pType = 'study';
      }
      setModifyButtonClick(true);
      navigate(`${ROUTES.CREATE}${pType}`);
    } else if (classification === 'modify') {
      navigate(`${ROUTES.MODIFY_PROJECT}`);
    }
  };

  const handleSubmitButton = async () => {
    if (classification === 'create') {
      const res = await postProject();
      resetProject();
      navigate(`${ROUTES.PROJECT}${res}`);
    } else if (classification === 'modify') {
      const res = await patchProject();
      navigate(`${ROUTES.PROJECT}${res}`);
    }
  };

  //백엔드에 게시물 데이터 전송하는 POST 함수
  const postProject = async () => {
    try {
      // 에디터 이미지 파일로 변환
      const imgFiles = base64sToFiles(
        findBase64(project.project_introduction),
        `${new Date().getTime()}`
      );
      // 에디터 이미지 서버 경로 추출
      const urls = imgFiles.map((file) => `${IMG_DOMAIN}/static/project/${file.name}`);
      // base64 => 에디터 이미지 서버 경로로 대체
      const newIntroduction = base64imgSrcParser(project.project_introduction, urls);

      const formData = new FormData();

      formData.append('project_type', project.project_type);
      formData.append('project_title', project.project_title);
      formData.append('project_summary', project.project_summary);
      formData.append(
        'project_recruitment_roles',
        JSON.stringify(project.project_recruitment_roles.roleList)
      );
      formData.append(
        'project_required_stacks',
        JSON.stringify(project.project_required_stacks.stackList)
      );
      formData.append('project_goal', project.project_goal);
      formData.append('project_participation_time', project.project_participation_time);
      formData.append('project_introduction', newIntroduction);
      imgFiles.forEach((file) => formData.append('project_img', file as File));

      const res = await Fetcher.postProject(formData);
      return res.data.project_id;
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '400':
            alert(`${error}: 요청 body에 모든 정보를 입력해 주세요.`);
            break;
          case '401':
            alert(`${error}: 토큰이 만료되었습니다.`);
            Token.removeToken();
            break;
          default:
            alert(`${error}: 예기치 못한 서버 오류입니다.`);
        }
      }
      navigate(ROUTES.HOME);
    }
  };

  //백엔드에 게시물 데이터 전송하는 PATCH 함수
  const patchProject = async () => {
    try {
      const imgFiles = base64sToFiles(
        findBase64(project.project_introduction),
        `${new Date().getTime()}`
      );
      // 에디터 이미지 서버 경로 추출
      const urls = imgFiles.map((file) => `${IMG_DOMAIN}/static/project/${file.name}`);
      // base64 => 에디터 이미지 서버 경로로 대체
      const newIntroduction = base64imgSrcParser(project.project_introduction, urls);

      const formData = new FormData();

      formData.append('project_type', project.project_type);
      formData.append('project_title', project.project_title);
      formData.append('project_summary', project.project_summary);
      formData.append(
        'project_recruitment_roles',
        JSON.stringify(project.project_recruitment_roles.roleList)
      );
      formData.append(
        'project_required_stacks',
        JSON.stringify(project.project_required_stacks.stackList)
      );
      formData.append('project_goal', project.project_goal);
      formData.append('project_participation_time', project.project_participation_time);
      formData.append('project_introduction', newIntroduction);
      imgFiles.forEach((file) => formData.append('project_img', file as File));

      const res = await Fetcher.patchProject(formData, projectId);
      return res.data.project_id;
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '400':
            alert(`${error}: project_id를 입력해 주세요.`);
            break;
          case '401':
            alert(`${error}: 토큰이 만료되었습니다.`);
            Token.removeToken();
            break;
          default:
            alert(`${error}: 예기치 못한 서버 오류입니다.`);
        }
      }
      navigate(ROUTES.HOME);
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
            {classification === 'project' || project.project_type === 'PROJECT'
              ? '프로젝트 편집'
              : '스터디 편집'}
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
