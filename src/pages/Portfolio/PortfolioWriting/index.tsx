import Stack from '../../../components/Stack';
import SummaryTextForm from '../../../components/PortfolioWritingForm/SummaryTextForm';
import TitleTextForm from '../../../components/PortfolioWritingForm/TitleTextForm';
import { useEffect, useState } from 'react';
import Editor from '../../../components/Editor/Editor';
import MemberSelectForm from '../../../components/PortfolioWritingForm/MemberSelectForm';
import styles from './PortfolioCreateWriting.module.scss';

function PortfolioWriting() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<number[]>([]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleSummaryChange = (value: string) => {
    setSummary(value);
  };

  const handleStackSelect = (stacks: string[]) => {
    setStacks(stacks);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };

  const handleMemberIdSelect = (userId: number) => {
    setMembers((prev) => [...prev, userId]);
  };

  const handleMemberIdUnselect = (userId: number) => {
    setMembers((prev) => prev.filter((prevUserId) => prevUserId !== userId));
  };

  const handleSubmitClick = () => {
    const form = { title, summary, stacks, description, members };
    console.log(form);
  };

  return (
    <div className={styles.container}>
      <h1>프로젝트 소개 작성</h1>
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <label>
            <h3>제목</h3>
            <TitleTextForm value={title} onChange={handleTitleChange} />
          </label>
          <label>
            <h3>요약</h3>
            <SummaryTextForm value={summary} onChange={handleSummaryChange} />
          </label>
          <div>
            <h3>내용</h3>
            <Editor value={description} onChange={handleDescriptionChange} />
          </div>
          <div>
            <h3>사용 기술스택</h3>
            <Stack selectedStack={stacks} setStackList={handleStackSelect} />
          </div>
          <div>
            <h3>참여 멤버</h3>
            <MemberSelectForm
              onMemberIdsSelect={handleMemberIdSelect}
              onMemberIdsUnselect={handleMemberIdUnselect}
            />
          </div>
        </div>
        <div>
          <button>임시 저장</button>
          <button onClick={handleSubmitClick}>작성 완료</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioWriting;
