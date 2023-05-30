import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioButton from './RadioButton';
import Editor from '../Editor/Editor';
import { TypeProjectPost } from '@/interfaces/Project.interface';
import styles from './ProjectWritingForm.module.scss';

const placeholderString = {
  title: `제목을 입력하세요.`,
  summary: `프로젝트 요약을 입력하세요.\n\n온/오프라인으로 달리기 모임을 만들고 찾을 수 있는 앱을 기획 중입니다. 현재 기획자 1명, 백엔드 개발자 1명 있고, 함께 하실 디자이너와 프론트 개발자를 찾고 있어요!`,
  introduce: `프로젝트 소개를 입력하세요.`,
  stack: `기술 스택을 입력하세요.`,
};
const goalRadioButton = ['포트폴리오/직무 역량 강화', '창업/수익 창출', '재미/네트워킹'];
const timeRadioButton = ['매주 4시간 이하', '매주 4-10시간', '매주 10시간 이상'];

function ProjecttWritingForm() {
  const [project, setProject] = useState<TypeProjectPost>({
    project_type: '',
    project_recruitment_status: '모집중',
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
  const [stackInputValue, setStackInputValue] = useState<string>('');

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

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // 게시물 데이터를 서버에 전송하거나 필요한 처리를 수행
  //   console.log(post);
  //   // 게시물 작성 후 초기화
  //   setPost({ title: '', summary: '', introduce: '' });
  // };

  console.log(project);

  return (
    <div className={styles.container}>
      <nav></nav>
      <div className={styles.mainForm}>
        <div className="projectWriteForm">
          <div className={styles.title}>
            <div className={styles.type}>
              <p>사이드 프로젝트</p>
            </div>
            <input
              className={styles.titleTextarea}
              type="text"
              name="project_title"
              value={project.project_title}
              onChange={handleProjectChange}
              placeholder={placeholderString.title}
            />
            {project.project_title}
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
              {project.project_summary}
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
                label={goalRadioButton[0]}
                value={goalRadioButton[0]}
                name="goalOption1"
                checked={selectedGoalRadioValue === goalRadioButton[0]}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={goalRadioButton[1]}
                value={goalRadioButton[1]}
                name="goalOption2"
                checked={selectedGoalRadioValue === goalRadioButton[1]}
                onChange={handleGoalRadioChange}
              ></RadioButton>
              <RadioButton
                label={goalRadioButton[2]}
                value={goalRadioButton[2]}
                name="goalOption3"
                checked={selectedGoalRadioValue === goalRadioButton[2]}
                onChange={handleGoalRadioChange}
              ></RadioButton>
            </div>
          </div>

          <div>
            <div>
              <h2 className={styles.time}>참여 시간 (선택)</h2>
              <div>
                <span>추후 아이콘으로 바꾸기</span>
                <p className="arrowBox">매주 프로젝트에 쓸 수 있는 시간</p>
              </div>
            </div>
            <div className={styles.radioBox}>
              <RadioButton
                label={timeRadioButton[0]}
                value={timeRadioButton[0]}
                name="timeOption1"
                checked={selectedTimeRadioValue === timeRadioButton[0]}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={timeRadioButton[1]}
                value={timeRadioButton[1]}
                name="timeOption2"
                checked={selectedTimeRadioValue === timeRadioButton[1]}
                onChange={handleTimeRadioChange}
              ></RadioButton>
              <RadioButton
                label={timeRadioButton[2]}
                value={timeRadioButton[2]}
                name="timeOption3"
                checked={selectedTimeRadioValue === timeRadioButton[2]}
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
              {project.project_introduction}
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
              />
              <ul>
                {project.project_required_stacks.stackList.map((stack, index) => (
                  <li key={index}>{stack}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjecttWritingForm;
