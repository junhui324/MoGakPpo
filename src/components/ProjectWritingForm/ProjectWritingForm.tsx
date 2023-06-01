import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioButton from './RadioButton';
import Editor from '../Editor/Editor';
import { TypeProjectPost } from '../../interfaces/Project.interface';
import styles from './ProjectWritingForm.module.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import * as Fetcher from '../../apis/Fetcher';
import Stack from '../Stack';
import {
  PROJECT_TYPE,
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_ROLES,
} from '../../constant/project';
import { PLACEHOLDER_STRING, PROJECT_TYPE_STRING } from './constant';

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
    project_img: null,
  });
  const [selectedGoalRadioValue, setSelectedGoalRadioValue] = useState<string>('');
  const [selectedTimeRadioValue, setSelectedTimeRadioValue] = useState<string>('');
  const { type } = useParams();
  const [stackList, setStackList] = useState<string[]>([]);

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
  }, []);

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

    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      alert(`다음 필수 항목이 입력되지 않았습니다: ${missingFields.join(', ')}`);
      return;
    }

    if (stackList.length === 0) {
      setProject((prevProject) => ({
        ...prevProject,
        project_required_stacks: {
          stackList: ['미정'],
        },
      }));
    }
    //await Fetcher.postProject(project);
    console.log('json으로 보기:', JSON.stringify(project));
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
        isEmpty === 0 ? missingFields.push(field) : console.log('');
      } else if (!project[field as keyof typeof project]) {
        missingFields.push(field);
      }
    });

    return missingFields;
  };

  return (
    <div className={styles.container}>
      <nav></nav>
      <div className={styles.mainForm}>
        <div className={styles.projectWriteForm}>
          <div className={styles.title}>
            <div className={styles.type}>
              <p>{PROJECT_TYPE[project.project_type]}</p>
            </div>
            <input
              className={styles.titleTextarea}
              type="text"
              name="project_title"
              value={project.project_title}
              onChange={handleProjectChange}
              placeholder={PLACEHOLDER_STRING.TITLE}
            />
          </div>

          <div>
            <h2 className={styles.summary}>
              요약<span className={styles.essential}>*</span>
            </h2>
            <div className={styles.summaryBox}>
              <textarea
                className={styles.summaryTextarea}
                name="project_summary"
                value={project.project_summary}
                onChange={handleProjectChange}
                placeholder={PLACEHOLDER_STRING.SUMMARY}
              ></textarea>
            </div>
          </div>

          <div>
            <h2 className={styles.role}>
              모집 역할<span className={styles.essential}>*</span>
            </h2>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  id="FRONT"
                  onChange={(event) => handleCheckboxChange(event)}
                ></input>
                <label htmlFor="FRONT">{PROJECT_RECRUITMENT_ROLES.FRONT}</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="BACK"
                  onChange={(event) => handleCheckboxChange(event)}
                ></input>
                <label htmlFor="BACK">{PROJECT_RECRUITMENT_ROLES.BACK}</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="DESIGN"
                  onChange={(event) => handleCheckboxChange(event)}
                ></input>
                <label htmlFor="DESIGN">{PROJECT_RECRUITMENT_ROLES.DESIGN}</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="PM"
                  onChange={(event) => handleCheckboxChange(event)}
                ></input>
                <label htmlFor="PM">{PROJECT_RECRUITMENT_ROLES.PM}</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="ROLE_ETC"
                  onChange={(event) => handleCheckboxChange(event)}
                ></input>
                <label htmlFor="ROLE_ETC">{PROJECT_RECRUITMENT_ROLES.ROLE_ETC}</label>
              </div>
            </div>
          </div>

          <div>
            <h2 className={styles.goal}>
              목적<span className={styles.essential}>*</span>
            </h2>
            <div className={styles.radioBox}>
              <RadioButton
                label={PROJECT_GOAL.PORTFOLIO}
                value={PROJECT_GOAL.PORTFOLIO}
                name="PROJECT_GOAL"
                checked={selectedGoalRadioValue === PROJECT_GOAL.PORTFOLIO}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={PROJECT_GOAL.FOUNDED}
                value={PROJECT_GOAL.FOUNDED}
                name="PROJECT_GOAL"
                checked={selectedGoalRadioValue === PROJECT_GOAL.FOUNDED}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={PROJECT_GOAL.FUN}
                value={PROJECT_GOAL.FUN}
                name="PROJECT_GOAL"
                checked={selectedGoalRadioValue === PROJECT_GOAL.FUN}
                onChange={handleGoalRadioChange}
              ></RadioButton>
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
              <RadioButton
                label={PROJECT_PARTICIPATION_TIME.LESS}
                value={PROJECT_PARTICIPATION_TIME.LESS}
                name="PROJECT_PARTICIPATION_TIME"
                checked={selectedTimeRadioValue === PROJECT_PARTICIPATION_TIME.LESS}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={PROJECT_PARTICIPATION_TIME.MIDDLE}
                value={PROJECT_PARTICIPATION_TIME.MIDDLE}
                name="PROJECT_PARTICIPATION_TIME"
                checked={selectedTimeRadioValue === PROJECT_PARTICIPATION_TIME.MIDDLE}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={PROJECT_PARTICIPATION_TIME.MORE}
                value={PROJECT_PARTICIPATION_TIME.MORE}
                name="PROJECT_PARTICIPATION_TIME"
                checked={selectedTimeRadioValue === PROJECT_PARTICIPATION_TIME.MORE}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={PROJECT_PARTICIPATION_TIME.TIME_ETC}
                value={PROJECT_PARTICIPATION_TIME.TIME_ETC}
                name="PROJECT_PARTICIPATION_TIME"
                checked={selectedTimeRadioValue === PROJECT_PARTICIPATION_TIME.TIME_ETC}
                onChange={handleTimeRadioChange}
              ></RadioButton>
            </div>
          </div>

          <div>
            <h2 className={styles.introduction}>
              소개<span className={styles.essential}>*</span>
            </h2>
            <div>
              <textarea
                className="introduceTextarea"
                name="project_introduction"
                value={project.project_introduction}
                onChange={handleProjectChange}
                placeholder={PLACEHOLDER_STRING.INTRODUCE}
              ></textarea>
            </div>
          </div>

          <div>
            <h2>기술 스택</h2>
            <div>
              <Stack setStackList={handleSetStackList}></Stack>
            </div>
          </div>

          <div>
            <button className={styles.submitButton} onClick={handleSubmitButton}>
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectWritingForm;
