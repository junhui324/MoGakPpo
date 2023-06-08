import Stack from '../../../components/Stack';
import SummaryTextForm from '../../../components/PortfolioWritingForm/SummaryTextForm';
import TitleTextForm from '../../../components/PortfolioWritingForm/TitleTextForm';
import { useEffect, useState } from 'react';
import Editor from '../../../components/Editor/Editor';
import MemberSelectForm from '../../../components/PortfolioWritingForm/MemberSelectForm';
import styles from './PortfolioCreateWriting.module.scss';
import QuillEditor from '../../../components/Editor/Editor2';
import { TypeTeamProjectUser } from '../../../interfaces/User.interface';
import LengthCheck from '../../../components/ProjectWritingForm/LengthCheck';
import { base64imgParser, base64sToFiles, findBase64 } from '../../../utils/base64Utils';

function PortfolioWriting() {
  const MAX_TITLE_LENGTH = 50;
  const MAX_SUMMARY_LENGTH = 50;
  const MAX_MEMBERS_LENGTH = 5;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [savedDes, setSavedDes] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<TypeTeamProjectUser[]>([]);
  const [savedPost, setSavedPost] = useState<any>({});
  const savedPostData = localStorage.getItem('savedPortfolioPost');

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

  const handleStackSelect = (stacks: string[]) => {
    setStacks(stacks);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
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
    const imgFiles = base64sToFiles(findBase64(description), `${new Date().getTime()}`);
    // console.log(imgFiles);

    // 1) 이미지파일들만 post API1(이미지를 서버에 올리고 URL을 받는 API)
    // response 값 확인
    // description 상태 내 base64 코드 찾아서 src="response[0]"로 대체
    // 대체된 des 값과 나머지 폼 데이터를 post로 쏴주기 API2

    // 2)description base64 코드를 특정 코드로 '새미' 대체
    // imgFiles와 des와 나머지 폼데이터와 post
    // 백엔드에서 des필드의 'img'값을 src=""로 대체하여 디비에 저장

    //url 주소가 어떻게 오는지 확인
    //배열과 대조하여 img src=""에 주소 넣기
    const urls = ['1', '2'];

    // console.log(description);
    setDescription(base64imgParser(description, urls));

    const form = { title, summary, stacks, description, members };
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
    setSavedPost(savedPostData && JSON.parse(savedPostData));
  }, []);

  const handleImportSavedPost = () => {
    const postData = JSON.parse(savedPostData!);
    const confirm = window.confirm(
      '저장 된 글을 불러올 경우 현재 작성된 글은 지워집니다. 불러오겠습니까?'
    );

    if (confirm) {
      setTitle(postData.title);
      setSummary(postData.summary);
      setSavedDes(postData.description);
      setStacks(postData.stacks);
      setMembers(postData.members);
    }
  };

  return (
    <div className={styles.container}>
      <h1>프로젝트 소개 작성</h1>
      <div className={styles.formContainer}>
        <div className={styles.mainFormContainer}>
          <label>
            <h3>제목</h3>
            <LengthCheck valueLength={title.length} maxLength={MAX_TITLE_LENGTH} />
            <TitleTextForm value={title} onChange={handleTitleChange} />
          </label>
          <label>
            <h3>요약</h3>
            <LengthCheck valueLength={summary.length} maxLength={MAX_SUMMARY_LENGTH} />
            <SummaryTextForm value={summary} onChange={handleSummaryChange} />
          </label>
          <div>
            <h3>내용</h3>
            {/* <Editor value={description} onChange={handleDescriptionChange} /> */}
            <QuillEditor savedValue={savedDes} onEditorValueChange={handleDescriptionChange} />
          </div>
          <div>
            <h3>사용 기술스택</h3>
            <Stack selectedStack={stacks} setStackList={handleStackSelect} />
          </div>
          <div>
            <h3>참여 멤버</h3>
            <LengthCheck valueLength={members.length} maxLength={MAX_MEMBERS_LENGTH} />
            <MemberSelectForm
              selectedUserList={members}
              onMemberSelect={handleUserSelect}
              onMemberUnselect={handleUserUnselect}
            />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {savedPost && <button onClick={handleImportSavedPost}>임시저장 글 불러오기</button>}
          <button onClick={handleSaveClick}>임시 저장</button>
          <button onClick={handleSubmitClick}>작성 완료</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioWriting;
