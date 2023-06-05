import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import { TypeProjectPost } from '../../interfaces/Project.interface';
import styles from './ProjectWritingForm.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';
//import * as Fetcher from '../../apis/Fetcher';
import Stack from '../Stack';
import {
  PROJECT_TYPE,
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_ROLES,
} from '../../constants/project';
import { PLACEHOLDER_STRING, PROJECT_TYPE_STRING, MAX_NUMBER } from './constant';
import ValidateModal from './ValidateModal';
import useBeforeUnload from '../../hooks/useBeforeUnload';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

function ProjectWritingForm() {
  const [project, setProject] = useState<TypeProjectPost>({
    project_type: '',
    project_title: '',
    project_summary: '',
    project_recruitment_roles: { roleList: [] as string[] },
    project_required_stacks: { stackList: [] as string[] },
    project_goal: '',
    project_participation_time: '',
    project_introduction: '',
  });
  const [selectedGoalRadioValue, setSelectedGoalRadioValue] = useState<string>('');
  const [selectedTimeRadioValue, setSelectedTimeRadioValue] = useState<string>('');
  const { type } = useParams();
  const [stackList, setStackList] = useState<string[]>([]);
  const [buttonClick, setButtonClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const navigate = useNavigate();

  const handleSetStackList = (stacks: string[]) => {
    setStackList(stacks);
  };

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
  }, [type]);

  useEffect(() => {
    setProject((prevProject) => ({
      ...prevProject,
      project_required_stacks: {
        stackList: stackList,
      },
    }));
  }, [stackList]);

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
  const handleGoalRadioChange = (value: string) => {
    const key = Object.keys(PROJECT_GOAL).find((key) => PROJECT_GOAL[key] === value);
    setSelectedGoalRadioValue(value);
    if (key) {
      setProject((prevProject) => ({
        ...prevProject,
        project_goal: key,
      }));
    }
  };

  //참여 시간 라디오 버튼
  const handleTimeRadioChange = (value: string) => {
    const key = Object.keys(PROJECT_PARTICIPATION_TIME).find(
      (key) => PROJECT_PARTICIPATION_TIME[key] === value
    );
    setSelectedTimeRadioValue(value);
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

  //전송 버튼을 누르면 백엔드에 데이터 전송
  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonClick(true);
    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      setIsValidate(true);
      goToTop();
      return;
    }
    setIsValidate(false);

    if (stackList.length === 0) {
      setProject((prevProject) => ({
        ...prevProject,
        project_required_stacks: {
          stackList: ['미정'],
        },
      }));
    }

    // 게시글 id를 반환받아서 해당 id를 가진 게시물로 이동
    // const { project_id } = await Fetcher.postProject(project);
    // 임시 주소
    const project_id = 1;
    navigate(`/project/${project_id}`);
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
      }
    });

    return missingFields;
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        className={`${styles.helpBox}  ${
          project.project_title.length > MAX_NUMBER.TITLE ? styles.maxLengthTitle : ''
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
        className={`${styles.helpBox}  ${
          project.project_summary.length > MAX_NUMBER.SUMMARY ? styles.maxLengthSummary : ''
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
                label={PROJECT_RECRUITMENT_ROLES[role as keyof typeof PROJECT_RECRUITMENT_ROLES]}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.goal}>
            목적<span className={styles.essential}>*</span>
          </h2>
          <div className={styles.radioBox}>
            {Object.values(PROJECT_GOAL).map((goal) => (
              <RadioButton
                key={goal}
                label={goal}
                value={goal}
                name="PROJECT_GOAL"
                checked={selectedGoalRadioValue === goal}
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
            {Object.values(PROJECT_PARTICIPATION_TIME).map((time) => (
              <RadioButton
                key={time}
                label={time}
                value={time}
                name="PROJECT_PARTICIPATION_TIME"
                checked={selectedTimeRadioValue === time}
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
        <div>
          <TextareaAutosize
            className="introduceTextarea"
            minRows={6}
            name="project_introduction"
            value={project.project_introduction}
            onChange={handleProjectChange}
            placeholder={PLACEHOLDER_STRING.INTRODUCE}
          />
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
        <h2>기술 스택</h2>
        <div>
          <Stack
            selectedStack={project.project_required_stacks.stackList}
            setStackList={handleSetStackList}
          />
        </div>
      </div>

      <div></div>

      <div>
        <button className={styles.submitButton} onClick={handleSubmitButton}>
          작성 완료
        </button>
        {isValidate && buttonClick && <ValidateModal setModalOpen={setButtonClick} />}
      </div>
    </div>
  );
}

export default ProjectWritingForm;
