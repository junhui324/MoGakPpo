import Stack from '../../../components/Stack';
import SummaryTextForm from '../../../components/PortfolioWritingForm/SummaryTextForm';
import TitleTextForm from '../../../components/PortfolioWritingForm/TitleTextForm';
import { useEffect, useState } from 'react';
import Editor from '../../../components/Editor/Editor';
import MemberSelectForm from '../../../components/PortfolioWritingForm/MemberSelectForm';

function PortfolioWriting() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);

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

  useEffect(() => {
    console.log(description);
  }, [description]);

  return (
    <div>
      <TitleTextForm value={title} onChange={handleTitleChange} />
      <SummaryTextForm value={summary} onChange={handleSummaryChange} />
      <Stack selectedStack={stacks} setStackList={handleStackSelect} />
      <Editor value={description} onChange={handleDescriptionChange} />
      <MemberSelectForm />
    </div>
  );
}

export default PortfolioWriting;
