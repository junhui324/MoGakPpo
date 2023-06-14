import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProjectWritingForm.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';

import * as Fetcher from '../../apis/Fetcher';

import {
  PROJECT_TYPE,
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_ROLES,
} from '../../constants/project';
import { PLACEHOLDER_STRING, PROJECT_TYPE_STRING, MAX_NUMBER } from './constant';
import ROUTES from '../../constants/Routes';

import Stack from '../Stack';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import ValidateModal from './ValidateModal';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import Editor from '../Editor/ProjectEditor';

import * as Token from '../../apis/Token';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  projectState,
  stackListState,
  classificationState,
  projectIdState,
  modifyButtonClickState,
  editorIntroductionState,
} from '../../recoil/projectState';
import { loginAtom } from '../../recoil/loginState';

function ProjectWritingForm() {
  const [project, setProject] = useRecoilState(projectState);
  const [modifyButtonClick, setModifyButtonClick] = useRecoilState(modifyButtonClickState);
  const [stackList, setStackList] = useRecoilState(stackListState);
  const [description, setDescription] = useRecoilState(editorIntroductionState);
  const classification = useRecoilValue(classificationState);
  const projectId = useRecoilValue(projectIdState);
  const resetStackList = useResetRecoilState(stackListState);
  const resetDescription = useResetRecoilState(editorIntroductionState);
  const resetProject = useResetRecoilState(projectState);

  const [buttonClick, setButtonClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();

  // 로컬 스토리지에 있는 user 정보 가져오기
  const LoginData = useRecoilState(loginAtom);
  const userId = LoginData[0];

  // 수정하기 버튼 클릭 시, 백엔드에서 데이터 받아오기
  const getProjectData = async () => {
    try {
      const data = await Fetcher.getProject(projectId);
      setProject({
        ...project,
        project_type: data.project_type,
        project_title: data.project_title,
        project_summary: data.project_summary,
        project_recruitment_roles: { roleList: [...data.project_recruitment_roles.roleList] },
        project_required_stacks: { stackList: [...data.project_required_stacks.stackList] },
        project_goal: data.project_goal,
        project_participation_time: data.project_participation_time,
        project_introduction: data.project_introduction,
        project_img: undefined,
      });
      setDescription(data.project_introduction);
      setStackList(data.project_required_stacks.stackList);
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '401':
            alert(`${error}: 토큰이 만료되었습니다.`);
            Token.removeToken();
            break;
          default:
            alert(`${error}: 예기치 못한 서버 오류입니다.`);
        }
      }
      navigate(ROUTES.MAIN);
    }
  };

  useEffect(() => {
    if (!userId.user_id) {
      alert('로그인이 필요합니다.');
      navigate(ROUTES.LOGIN);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (classification === 'create') {
      if (modifyButtonClick) {
        setModifyButtonClick(false);
      } else {
        resetProject();
        resetDescription();
        resetStackList();

        const projectTypeValue = PROJECT_TYPE_STRING.get(type!);
        const key = Object.keys(PROJECT_TYPE).find((key) => PROJECT_TYPE[key] === projectTypeValue);
        if (projectTypeValue && key) {
          setProject((prevProject) => ({
            ...prevProject,
            project_type: key,
          }));
        }
      }
    } else if (classification === 'modify') {
      getProjectData();
      setDescription(project.project_introduction);
      setStackList(project.project_required_stacks.stackList);
    }
  }, [classification, type]);

  //프로젝트 타입 추출 및 저장
  useEffect(() => {
    const projectTypeValue = PROJECT_TYPE_STRING.get(type!);
    const key = Object.keys(PROJECT_TYPE).find((key) => PROJECT_TYPE[key] === projectTypeValue);
    if (projectTypeValue && key) {
      setProject((prevProject) => ({
        ...prevProject,
        project_type: key,
      }));
    }
  }, [type, setProject]);

  useEffect(() => {
    if (stackList.length === 0) {
      setStackList(['미정']);
    } else if (stackList[0] === '미정' && stackList.length === 2) {
      const newStackList = [...stackList];
      newStackList.shift();
      setStackList(newStackList);
    }
    setProject((prevProject) => ({
      ...prevProject,
      project_required_stacks: {
        stackList: stackList,
      },
    }));
  }, [stackList, setProject, setStackList]);

  useEffect(() => {
    setProject({
      ...project,
      project_introduction: description,
    });
  }, [description]);

  const handleProjectChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  //목표 라디오 버튼
  const handleGoalRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const key = Object.keys(PROJECT_GOAL).find((key) => key === value);
    if (key) {
      setProject((prevProject) => ({
        ...prevProject,
        project_goal: key,
      }));
    }
  };

  //참여 시간 라디오 버튼
  const handleTimeRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const key = Object.keys(PROJECT_PARTICIPATION_TIME).find((key) => key === value);
    if (key) {
      setProject((prevProject) => ({
        ...prevProject,
        project_participation_time: key,
      }));
    }
  };

  //모집 역할 체크박스
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.id;
    setProject((prevProject) => {
      const isSelected = prevProject.project_recruitment_roles.roleList.includes(value);

      if (isSelected) {
        return {
          ...prevProject,
          project_recruitment_roles: {
            ...prevProject.project_recruitment_roles,
            roleList: prevProject.project_recruitment_roles.roleList.filter(
              (role) => role !== value
            ),
          },
        };
      } else {
        return {
          ...prevProject,
          project_recruitment_roles: {
            ...prevProject.project_recruitment_roles,
            roleList: [...prevProject.project_recruitment_roles.roleList, value],
          },
        };
      }
    });
  };

  // 유효성 검사
  const getMissingFields = () => {
    const requiredFields: string[] = [
      'project_title',
      'project_summary',
      'project_recruitment_roles',
      'project_goal',
      'project_participation_time',
      'project_introduction',
    ];

    const missingFields: string[] = [];
    requiredFields.forEach((field) => {
      if (field === 'project_recruitment_roles') {
        const isEmpty = project.project_recruitment_roles.roleList.length;
        if (isEmpty === 0) {
          missingFields.push(field);
        }
      } else if (!project[field as keyof typeof project]) {
        missingFields.push(field);
      } else if (description === '<p><br></p>') {
        missingFields.push(field);
      }
    });

    return missingFields;
  };

  // 유효성 검사 실패한 폼으로 이동
  const goToInvalidField = () => {
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      const firstMissingField = missingFields[0];
      const inputElement = document.getElementsByName(firstMissingField)[0] as HTMLInputElement;
      if (inputElement) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: window.scrollY - 200, behavior: 'smooth' });
      }
    }
  };

  //전송 버튼을 누르면 미리보기 페이지로 이동
  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonClick(true);
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      setIsValidate(true);
      goToInvalidField();
      return;
    }
    setIsValidate(false);

    navigate(`${ROUTES.PREVIEW_PROJECT}`);
  };

  const handleEditorChange = (content: string) => {
    setDescription(content);
  };

  const handleSetStackList = (stacks: string[]) => {
    setStackList(stacks);
  };

  useBeforeUnload();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.type}>
          <p>{PROJECT_TYPE[project.project_type]}</p>
        </div>
        <TextareaAutosize
          className={styles.titleTextarea}
          name="project_title"
          value={project.project_title}
          onChange={handleProjectChange}
          placeholder={PLACEHOLDER_STRING.TITLE}
          maxLength={MAX_NUMBER.TITLE}
        />
      </div>
      <div
        className={`${styles.titleHelpBox}  ${
          project.project_title.length >= MAX_NUMBER.TITLE ? styles.maxLengthTitle : ''
        }`}
      >
        <p>제목은 프로젝트를 직관적으로 알 수 있게 작성해주세요. (50자 이내)</p>
      </div>

      <div>
        <h2 className={styles.summary}>
          요약<span className={styles.essential}>*</span>
        </h2>
        <div className={styles.summaryBox}>
          <TextareaAutosize
            className={styles.summaryTextarea}
            minRows={7}
            name="project_summary"
            value={project.project_summary}
            onChange={handleProjectChange}
            placeholder={PLACEHOLDER_STRING.SUMMARY}
            maxLength={MAX_NUMBER.SUMMARY}
          />
        </div>
      </div>
      <div
        className={`${styles.summaryHelpBox}  ${
          project.project_summary.length >= MAX_NUMBER.SUMMARY ? styles.maxLengthSummary : ''
        }`}
      >
        <p>어떤 프로젝트인지 이해하기 쉽도록 명확하고 간결하게 요약해주세요. (150자 이내)</p>
      </div>

      <div>
        <div>
          <h2 className={styles.role}>
            모집 역할<span className={styles.essential}>*</span>
          </h2>
          <div className={styles.checkbox}>
            {Object.keys(PROJECT_RECRUITMENT_ROLES).map((role) => (
              <Checkbox
                key={role}
                id={role}
                name="project_recruitment_roles"
                label={PROJECT_RECRUITMENT_ROLES[role as keyof typeof PROJECT_RECRUITMENT_ROLES]}
                onChange={handleCheckboxChange}
                isChecked={project.project_recruitment_roles.roleList.includes(role)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.goal}>
            목적<span className={styles.essential}>*</span>
          </h2>
          <div className={styles.radioBox}>
            {Object.keys(PROJECT_GOAL).map((goal) => (
              <RadioButton
                key={goal}
                label={PROJECT_GOAL[goal as keyof typeof PROJECT_GOAL]}
                value={goal}
                name="project_goal"
                checked={project.project_goal === goal}
                onChange={handleGoalRadioChange}
              />
            ))}
          </div>
        </div>

        <div>
          <div className={styles.timeBox}>
            <h2 className={styles.time}>
              참여 시간<span className={styles.essential}>*</span>
            </h2>
            <div className={styles.speechBubble}>
              <AiOutlineInfoCircle className={styles.svg} />
              <div className={styles.arrowBox}>매주 프로젝트에 쓸 수 있는 시간</div>
            </div>
          </div>

          <div className={styles.radioBox}>
            {Object.keys(PROJECT_PARTICIPATION_TIME).map((time) => (
              <RadioButton
                key={time}
                label={PROJECT_PARTICIPATION_TIME[time as keyof typeof PROJECT_PARTICIPATION_TIME]}
                value={time}
                name="project_participation_time"
                checked={project.project_participation_time === time}
                onChange={handleTimeRadioChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div></div>

      <div>
        <h2 className={styles.introduction}>
          소개<span className={styles.essential}>*</span>
        </h2>
        <div className={styles.editorBox}>
          <Editor value={description} onChange={handleEditorChange}></Editor>
        </div>
      </div>
      <div className={styles.introHelpBox}>
        <p>
          소개에는 이런 내용이 있으면 좋아요👇
          <br />
          <br />
          • 어떤 프로젝트인지
          <br />
          • 프로젝트를 기획한 배경
          <br />
          • 프로젝트의 목적이나 달성하고 싶은 목표
          <br />
          • 모집하고 싶은 역할과 인원수
          <br />
          • 프로젝트 진행 방식
          <br />
          <br />
          이미 진행 중인 프로젝트라면, 현재 구성원과 진행 상황을 알려주세요!
        </p>
      </div>

      <div>
        <div>
          <Stack selectedStack={stackList} setStackList={handleSetStackList} />
        </div>
      </div>

      <div></div>

      <div>
        <button className={styles.submitButton} onClick={handleSubmitButton}>
          {classification === 'create' ? '작성 완료' : '수정 완료'}
        </button>
        {isValidate && buttonClick && <ValidateModal setModalOpen={setButtonClick} />}
      </div>
    </div>
  );
}

export default ProjectWritingForm;
