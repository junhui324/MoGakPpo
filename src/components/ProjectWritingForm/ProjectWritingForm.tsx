import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import '../Editor/editor.css';

import * as Token from '../../apis/Token';

import { useRecoilState } from 'recoil';
import { loginAtom } from '../../recoil/loginState';
import { TypeProjectPost } from '../../interfaces/Project.interface';

interface ProjectWritingType {
  editMode?: boolean;
  publishedPostData?: TypeProjectPost;
}

function ProjectWritingForm({ editMode, publishedPostData }: ProjectWritingType) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [recruitmentRoles, setRecruitmentRoles] = useState<string[]>([]);
  const [stackList, setStackList] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [participationTime, setParticipationTime] = useState('');
  const [introduction, setIntroduction] = useState('');
  //const [img, setImg] = useState(undefined);

  const [buttonClick, setButtonClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const [maxLengthValidate, setMaxLengthValidate] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const [path, setPath] = useState('');
  const [type, setType] = useState('');

  // 로컬 스토리지에 저장되어 있는 user 정보 가져오기
  const LoginData = useRecoilState(loginAtom);
  const userId = LoginData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setPath(location.pathname.split('/')[1]);
    setType(location.pathname.split('/')[2].toUpperCase());
  }, []);

  useEffect(() => {
    if (!userId.user_id) {
      alert('로그인이 필요합니다.');
      navigate(ROUTES.LOGIN);
    }
  }, [navigate, userId.user_id]);

  // 제목 textarea
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  // 요약 textarea
  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSummary(value);
  };

  //목표 라디오 버튼
  const handleGoalRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const key = Object.keys(PROJECT_GOAL).find((key) => key === value);
    if (key) {
      setGoal(key);
    }
  };

  //참여 시간 라디오 버튼
  const handleTimeRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const key = Object.keys(PROJECT_PARTICIPATION_TIME).find((key) => key === value);
    if (key) {
      setParticipationTime(key);
    }
  };

  //모집 역할 체크박스
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.id;
    setRecruitmentRoles((prevRoles) => {
      const isSelected = prevRoles.includes(value);
      if (isSelected) {
        return prevRoles.filter((role) => role !== value);
      } else {
        return [...prevRoles, value];
      }
    });
  };

  // 유효성 검사
  const validation = () => {
    if (!title || !summary || !recruitmentRoles || !goal || !participationTime || !introduction) {
      return false;
    } else if (introduction === '<p><br></p>') {
      return false;
    }
    return true;
  };

  // 작성 완료 버튼 클릭
  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonClick(true);

    const isOk = validation();
    console.log(isOk);
    if (!isOk) {
      setIsValidate(false);
      return;
    }
    setIsValidate(true);

    localStorage.setItem(
      'previewPost',
      JSON.stringify({
        type,
        title,
        summary,
        recruitmentRoles,
        stackList,
        goal,
        participationTime,
        introduction,
      })
    );

    navigate(`${ROUTES.PREVIEW_PROJECT}`);
  };

  const handleEditorChange = (content: string) => {
    setIntroduction(content);
  };

  const handleSetStackList = (stacks: string[]) => {
    setStackList(stacks);
  };

  useBeforeUnload();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.type}>
          <p>{PROJECT_TYPE[type]}</p>
        </div>
        <TextareaAutosize
          className={styles.titleTextarea}
          name="project_title"
          value={title}
          onChange={handleTitleChange}
          placeholder={PLACEHOLDER_STRING.TITLE}
          maxLength={MAX_NUMBER.TITLE}
        />
      </div>
      <div
        className={`${styles.titleHelpBox}  ${
          title.length >= MAX_NUMBER.TITLE ? styles.maxLengthTitle : ''
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
            value={summary}
            onChange={handleSummaryChange}
            placeholder={PLACEHOLDER_STRING.SUMMARY}
            maxLength={MAX_NUMBER.SUMMARY}
          />
        </div>
      </div>
      <div
        className={`${styles.summaryHelpBox}  ${
          summary.length >= MAX_NUMBER.SUMMARY ? styles.maxLengthSummary : ''
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
            {Object.keys(PROJECT_RECRUITMENT_ROLES).map((roleData) => (
              <Checkbox
                key={roleData}
                id={roleData}
                name="project_recruitment_roles"
                label={
                  PROJECT_RECRUITMENT_ROLES[roleData as keyof typeof PROJECT_RECRUITMENT_ROLES]
                }
                onChange={handleCheckboxChange}
                isChecked={recruitmentRoles.includes(roleData)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.goal}>
            목적<span className={styles.essential}>*</span>
          </h2>
          <div className={styles.radioBox}>
            {Object.keys(PROJECT_GOAL).map((goalData) => (
              <RadioButton
                key={goalData}
                label={PROJECT_GOAL[goalData as keyof typeof PROJECT_GOAL]}
                value={goalData}
                name="project_goal"
                checked={goal === goalData}
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
            {Object.keys(PROJECT_PARTICIPATION_TIME).map((timeData) => (
              <RadioButton
                key={timeData}
                label={
                  PROJECT_PARTICIPATION_TIME[timeData as keyof typeof PROJECT_PARTICIPATION_TIME]
                }
                value={timeData}
                name="project_participation_time"
                checked={participationTime === timeData}
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
          <Editor value={introduction} onChange={handleEditorChange}></Editor>
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
          {path === 'create' ? '작성 완료' : '수정 완료'}
        </button>
        {!isValidate && buttonClick && (
          <ValidateModal maxLengthValidate={maxLengthValidate} setModalOpen={setButtonClick} />
        )}
      </div>
    </div>
  );
}

export default ProjectWritingForm;
