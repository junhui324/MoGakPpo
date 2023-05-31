import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioButton from './RadioButton';
import Editor from '../Editor/Editor';
import { TypeProjectPost } from '../../interfaces/Project.interface';
import styles from './ProjectWritingForm.module.scss';
import { projectTypeString, placeholderString, goalRadioButton, timeRadioButton } from './constant';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import * as Fetcher from '../../apis/Fetcher';
import Stack from '../Stack';

function ProjectWritingForm() {
  const [project, setProject] = useState<TypeProjectPost>({
    project_type: '',
    project_recruitment_status: null,
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
  const [stackInputValue, setStackInputValue] = useState<string>('');
  const [isStackInputDisabled, setIsStackInputDisabled] = useState(false);
  const { type } = useParams();

  useEffect(() => {
    const projectTypeValue = projectTypeString.get(type!);
    if (projectTypeValue) {
      setProject((prevProject) => ({
        ...prevProject,
        project_type: projectTypeValue,
      }));
    }
  }, []);

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleGoalRadioChange = (value: string) => {
    setSelectedGoalRadioValue(value);
    setProject((prevProject) => ({
      ...prevProject,
      project_goal: value,
    }));
  };
  const handleTimeRadioChange = (value: string) => {
    setSelectedTimeRadioValue(value);
    setProject((prevProject) => ({
      ...prevProject,
      project_participation_time: value,
    }));
  };

  const handleCheckboxChange = (value: string) => {
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

  const handleStackInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (stackInputValue.trim() !== '') {
        setProject((prevProject) => ({
          ...prevProject,
          project_required_stacks: {
            stackList: [...prevProject.project_required_stacks.stackList, stackInputValue.trim()],
          },
        }));
        setStackInputValue('');
      }
    }
  };

  //전송 버튼을 누르면 백엔드에 데이터 전송
  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    //await Fetcher.postProject(project);
    console.log('json으로 보기:', JSON.stringify(project));
  };

  //버튼 클릭 시, 기술스택 input 비활성화 및 미정 저장
  const handleButtonClick = () => {
    setIsStackInputDisabled(!isStackInputDisabled);
    const updatedStackList = isStackInputDisabled ? [] : ['미정'];
    setProject((prevProject) => ({
      ...prevProject,
      project_required_stacks: {
        stackList: updatedStackList,
      },
    }));
  };

  console.log(project);

  return (
    <div className={styles.container}>
      <nav></nav>
      <div className={styles.mainForm}>
        <div className={styles.projectWriteForm}>
          <div className={styles.title}>
            <div className={styles.type}>
              <p>{project.project_type}</p>
            </div>
            <input
              className={styles.titleTextarea}
              type="text"
              name="project_title"
              value={project.project_title}
              onChange={handleProjectChange}
              placeholder={placeholderString.title}
            />
          </div>

          <div>
            <h2 className={styles.summary}>요약</h2>
            <div className={styles.summaryBox}>
              <textarea
                className={styles.summaryTextarea}
                name="project_summary"
                value={project.project_summary}
                onChange={handleProjectChange}
                placeholder={placeholderString.summary}
              ></textarea>
            </div>
          </div>

          <div>
            <h2 className={styles.role}>모집 역할</h2>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  id="engineeringFrontend"
                  onChange={() => handleCheckboxChange('프론트엔드')}
                ></input>
                <label htmlFor="engineeringFrontend">프론트엔드</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="engineeringBackend"
                  onChange={() => handleCheckboxChange('백엔드')}
                ></input>
                <label htmlFor="engineeringBackend">백엔드</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="design"
                  onChange={() => handleCheckboxChange('디자인')}
                ></input>
                <label htmlFor="design">디자인</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="pm"
                  onChange={() => handleCheckboxChange('기획')}
                ></input>
                <label htmlFor="pm">기획</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="other"
                  onChange={() => handleCheckboxChange('기타')}
                ></input>
                <label htmlFor="other">기타</label>
              </div>
            </div>
          </div>

          <div>
            <h2 className={styles.goal}>목적</h2>
            <div className={styles.radioBox}>
              <RadioButton
                label={goalRadioButton.portfolio}
                value={goalRadioButton.portfolio}
                name="goalOption1"
                checked={selectedGoalRadioValue === goalRadioButton.portfolio}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={goalRadioButton.founded}
                value={goalRadioButton.founded}
                name="goalOption2"
                checked={selectedGoalRadioValue === goalRadioButton.founded}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={goalRadioButton.fun}
                value={goalRadioButton.fun}
                name="goalOption3"
                checked={selectedGoalRadioValue === goalRadioButton.fun}
                onChange={handleGoalRadioChange}
              ></RadioButton>
            </div>
          </div>

          <div>
            <div className={styles.timeBox}>
              <h2 className={styles.time}>참여 시간</h2>
              <div className={styles.speechBubble}>
                <AiOutlineInfoCircle className={styles.svg} />
                <div className={styles.arrowBox}>매주 프로젝트에 쓸 수 있는 시간</div>
              </div>
            </div>

            <div className={styles.radioBox}>
              <RadioButton
                label={timeRadioButton.less}
                value={timeRadioButton.less}
                name="timeOption1"
                checked={selectedTimeRadioValue === timeRadioButton.less}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={timeRadioButton.middle}
                value={timeRadioButton.middle}
                name="timeOption2"
                checked={selectedTimeRadioValue === timeRadioButton.middle}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={timeRadioButton.more}
                value={timeRadioButton.more}
                name="timeOption3"
                checked={selectedTimeRadioValue === timeRadioButton.more}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={timeRadioButton.etc}
                value={timeRadioButton.etc}
                name="timeOption4"
                checked={selectedTimeRadioValue === timeRadioButton.etc}
                onChange={handleTimeRadioChange}
              ></RadioButton>
            </div>
          </div>

          <div>
            <h2 className={styles.introduction}>소개</h2>
            <div>
              <textarea
                className="introduceTextarea"
                name="project_introduction"
                value={project.project_introduction}
                onChange={handleProjectChange}
                placeholder={placeholderString.introduce}
              ></textarea>
            </div>
          </div>

          <div>
            <h2>기술 스택</h2>
            <div>
              <input
                className={styles.stack}
                type="text"
                name="stackInputValue"
                value={stackInputValue}
                onChange={(e) => setStackInputValue(e.target.value)}
                onKeyUp={handleStackInputKeyPress}
                placeholder={placeholderString.stack}
                disabled={isStackInputDisabled}
              />
              <ul>
                {project.project_required_stacks.stackList.map((stack, index) => (
                  <li key={index}>{stack}</li>
                ))}
              </ul>
              <button onClick={handleButtonClick}>
                {isStackInputDisabled ? '기술 스택이 아직 미정이에요.' : '기술 스택을 입력하세요'}
              </button>
            </div>
          </div>

          <div>
            <button onClick={handleSubmitButton}>작성 완료</button>
          </div>

          <Stack></Stack>
        </div>
      </div>
    </div>
  );
}

export default ProjectWritingForm;
