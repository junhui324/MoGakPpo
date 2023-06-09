import Stack from '../../../components/Stack';
import BasicTextForm from '../../../components/PortfolioWritingForm/BasicTextForm';
import TitleTextForm from '../../../components/PortfolioWritingForm/TitleTextForm';
import { useEffect, useState } from 'react';
import Editor from '../../../components/Editor/Editor';
import MemberSelectForm from '../../../components/PortfolioWritingForm/MemberSelectForm';
import styles from './PortfolioCreateWriting.module.scss';
import QuillEditor from '../../../components/Editor/Editor2';
import { TypeTeamProjectUser } from '../../../interfaces/User.interface';
import LengthCheck from '../../../components/ProjectWritingForm/LengthCheck';
import { base64imgSrcParser, base64sToFiles, findBase64 } from '../../../utils/base64Utils';
import ThumbnailInput from '../../../components/PortfolioWritingForm/ThumbnailInput';

function PortfolioWriting() {
  const MAX_TITLE_LENGTH = 50;
  const MAX_SUMMARY_LENGTH = 150;
  const MAX_MEMBERS_LENGTH = 10;
  const MAX_GITHUB_LENGTH = 100;

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [savedDes, setSavedDes] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<TypeTeamProjectUser[]>([]);
  const [savedPost, setSavedPost] = useState<any>({});
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [gitHubUrl, setGitHubUrl] = useState('');

  const handleThumbnailSelect = (file: File) => {
    setThumbnailFile(file);
  };

  const handleTitleChange = (value: string) => {
    if (title.length < MAX_TITLE_LENGTH) {
      setTitle(value);
    }
  };

  const handleSummaryChange = (value: string) => {
    if (summary.length < MAX_SUMMARY_LENGTH) {
      setSummary(value);
    }
  };

  const handleGitHubUrlChange = (value: string) => {
    if (summary.length < MAX_GITHUB_LENGTH) {
      setGitHubUrl(value);
    }
  };

  const handleStackSelect = (stacks: string[]) => {
    setStacks(stacks);
  };

  let timeoutId: any;
  const handleDescriptionChange = (content: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDescription(content);
    }, 500);
  };

  const handleUserSelect = (userData: TypeTeamProjectUser): void => {
    if (
      members.length < MAX_MEMBERS_LENGTH &&
      !members.some((user) => user.user_id === userData.user_id)
    ) {
      setMembers((current) => [...current, userData]);
    }
  };

  const handleUserUnselect = (userId: number) => {
    setMembers((prev) => prev.filter((user) => user.user_id !== userId));
  };

  const handleSubmitClick = () => {
    // 에디터 이미지 파일로 변환
    const imgFiles = base64sToFiles(findBase64(description), `${new Date().getTime()}`);
    console.log(imgFiles);

    // 에디터 이미지 서버 경로 추출
    const urls = imgFiles.map((file) => `src/images/${file.name}.${file.type.split('/')[1]}`);

    // base64 => 에디터 이미지 서버 경로로 대체
    const newDescription = base64imgSrcParser(description, urls);

    const formData = new FormData();
    formData.append('portfolio_title', title);
    formData.append('portfolio_summary', summary);
    formData.append('portfolio_stacks', JSON.stringify(stacks || []));
    // formData.append('portfolio_des_imgs',imgFiles);
    formData.append('portfolio_description', newDescription);
    // formData.append('portfolio_members',members);
    // formData.append('portfolio_thumbnail',thumbnailFile);

    console.log(formData);

    const form = { title, summary, stacks, description, members, thumbnailFile };
    !title && alert('제목을 입력해 주세요.');
    !summary && alert('요약을 입력해 주세요.');
    !description && alert('내용을 입력해 주세요.');
    title && summary && description && console.log(form);
  };

  const handleSaveClick = () => {
    if (
      title.length === 0 &&
      summary.length === 0 &&
      description.length === 0 &&
      stacks.length === 0 &&
      members.length === 0
    ) {
      alert('최소 한 개 이상의 필드를 입력해 주세요.');
      return;
    }

    const form = { title, summary, stacks, description, members };
    localStorage.setItem('savedPortfolioPost', JSON.stringify(form));
    alert('임시저장 성공');
  };

  //로컬스토리지에 postData가 있으면 savedPost 상태 저장
  useEffect(() => {
    const savedPostData = localStorage.getItem('savedPortfolioPost');
    setSavedPost(savedPostData && JSON.parse(savedPostData));
  }, []);

  const handleImportSavedPost = () => {
    const savedPostData = localStorage.getItem('savedPortfolioPost');
    const postData = JSON.parse(savedPostData!);
    const confirm = window.confirm(
      '저장 된 글을 불러올 경우 현재 작성된 글은 지워집니다. 불러오겠습니까?'
    );

    if (confirm) {
      setTitle(postData.title);
      //썸네일 임시저장은 어떻게.......?
      setSummary(postData.summary);
      setSavedDes(postData.description);
      setStacks(postData.stacks);
      setMembers(postData.members);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>프로젝트 자랑 작성</h1>
      <div className={styles.mainFormContainer}>
        <label>
          <div className={styles.inputTop}>
            <h3>프로젝트 제목</h3>
            <LengthCheck valueLength={title.length} maxLength={MAX_TITLE_LENGTH} />
          </div>
          <TitleTextForm value={title} onChange={handleTitleChange} />
        </label>
        <label>
          <div className={styles.inputTop}>
            <h3>요약</h3>
            <LengthCheck valueLength={summary.length} maxLength={MAX_SUMMARY_LENGTH} />
          </div>
          <BasicTextForm
            value={summary}
            onChange={handleSummaryChange}
            placeholder={'프로젝트를 짧게 설명해 주세요.'}
          />
        </label>
        <div>
          <h3>썸네일</h3>
          <ThumbnailInput imgFile={thumbnailFile!} onInputChange={handleThumbnailSelect} />
        </div>
        <div>
          <h3>내용</h3>
          {/* <Editor value={description} onChange={handleDescriptionChange} /> */}
          <QuillEditor savedValue={savedDes} onEditorValueChange={handleDescriptionChange} />
        </div>
        <label>
          <div className={styles.inputTop}>
            <h3>깃허브 레포지토리 링크</h3>
            <LengthCheck valueLength={gitHubUrl.length} maxLength={MAX_GITHUB_LENGTH} />
          </div>
          <BasicTextForm
            value={gitHubUrl}
            onChange={handleGitHubUrlChange}
            placeholder={'URL을 입력해 주세요.'}
          />
        </label>
        <div>
          <h3>사용 기술스택</h3>
          <Stack selectedStack={stacks} setStackList={handleStackSelect} />
        </div>
        <div>
          <div className={styles.inputTop}>
            <h3>참여 멤버</h3>
            <LengthCheck valueLength={members.length} maxLength={MAX_MEMBERS_LENGTH} />
          </div>
          <MemberSelectForm
            selectedUserList={members}
            onMemberSelect={handleUserSelect}
            onMemberUnselect={handleUserUnselect}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        {savedPost && <button onClick={handleImportSavedPost}>임시저장 글 불러오기</button>}
        <div>
          <button onClick={handleSaveClick}>임시 저장</button>
          <button onClick={handleSubmitClick}>작성 완료</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioWriting;
