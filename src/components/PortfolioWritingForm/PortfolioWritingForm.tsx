import Stack from '../Stack';
import BasicTextForm from './BasicTextForm';
import TitleTextForm from './TitleTextForm';
import MemberSelectForm from './MemberSelectForm';
import QuillEditor from '../Editor/Editor2';
import LengthCheck from '../ProjectWritingForm/LengthCheck';
import ThumbnailInput from './ThumbnailInput';
import ROUTES from '../../constants/Routes';
import styles from './PortfolioCreateWriting.module.scss';
import * as Fetcher from '../../apis/Fetcher';
import * as Token from '../../apis/Token';

import { useEffect, useRef, useState } from 'react';
import { TypeTeamProjectUser } from '../../interfaces/User.interface';
import { base64imgSrcParser, base64sToFiles, findBase64 } from '../../utils/base64Utils';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilValue } from 'recoil';
import { HighlightModules } from '../Editor/Highlight';
import { useNavigate } from 'react-router-dom';
import { TypePortfolioDetail } from '../../interfaces/Portfolio.interface';
import Quill from 'quill';

const IMG_DOMAIN = process.env.REACT_APP_DOMAIN;
const MAX_TITLE_LENGTH = 50;
const MAX_SUMMARY_LENGTH = 150;
export const MAX_MEMBERS_LENGTH = 10;
const MAX_GITHUB_LENGTH = 100;

interface PortfolioWritingProps {
  editMode?: boolean;
  publishedPostData?: TypePortfolioDetail;
}

function PortfolioWriting({ editMode, publishedPostData }: PortfolioWritingProps) {
  const navigate = useNavigate();
  const loginData = useRecoilValue(loginAtom);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stacks, setStacks] = useState<string[]>([]);
  const [members, setMembers] = useState<TypeTeamProjectUser[]>([]);
  const [isPostSaved, setIsPostSaved] = useState<boolean>(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [gitHubUrl, setGitHubUrl] = useState('');

  const quillRef = useRef<any>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);

  // 로그인 여부 확인
  useEffect(() => {
    if (!Token.getToken()) {
      alert('로그인 후 사용 가능합니다.');
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  // 퀼에디터 추가
  useEffect(() => {
    quillRef.current = new Quill('#editor-container', {
      modules: {
        ...HighlightModules,
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', { 'code-block': 'highlight' }],
          ['image'],
          [{ imageDrop: true, imagePaste: true }],
        ],
      },
      placeholder: '내용을 입력하세요...',
      theme: 'snow',
    });

    const codeBlockElements = document.querySelectorAll('.ql-syntax');
    codeBlockElements.forEach((element) => {
      element.classList.add('code-block');
    });
    return () => {};
  }, []);

  // 썸네일 미리보기 src
  useEffect(() => {
    if (thumbnailFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailSrc(reader.result as string);
      };
      reader.readAsDataURL(thumbnailFile);
    }
  }, [thumbnailFile]);

  // 수정 모드인 경우 원래 데이터 불러오기
  useEffect(() => {
    if (publishedPostData) {
      const {
        portfolio_title,
        portfolio_summary,
        portfolio_stacks,
        participated_members,
        portfolio_description,
        portfolio_github,
        portfolio_thumbnail,
      } = publishedPostData;
      setTitle(portfolio_title);
      setSummary(portfolio_summary);
      setStacks(portfolio_stacks.stackList);
      setMembers(participated_members);
      setThumbnailSrc(portfolio_thumbnail);
      setGitHubUrl(portfolio_github);
      quillRef.current.root.innerHTML = portfolio_description;
    }
  }, [publishedPostData]);

  useEffect(() => {
    //로컬스토리지에 postData가 있으면 savedPost 상태 저장
    const savedPostData = localStorage.getItem('savedPortfolioPost');
    savedPostData && setIsPostSaved(true);

    titleRef.current?.focus();
  }, []);

  // post패치
  const postData = async (formData: FormData) => {
    try {
      const response = editMode
        ? await Fetcher.patchPortfolio(publishedPostData!.portfolio_id.toString(), formData)
        : await Fetcher.postPortfolio(formData);
      navigate(`${ROUTES.PORTFOLIO_DETAIL}${response.data.portfolio_id}`);
    } catch (error: any) {
      switch (error.message) {
        case 401: {
          alert('로그인 후 이용해 주세요.');
          break;
        }
        case 400: {
          alert('입력되지 않은 정보를 확인해 주세요.');
          break;
        }
        default: {
          console.log(error);
        }
      }
    }
  };

  const handleThumbnailSelect = (file: File) => {
    setThumbnailFile(file);
  };

  const handleTitleChange = (value: string) => {
    if (value.length <= MAX_TITLE_LENGTH) {
      setTitle(value);
    }
  };

  const handleSummaryChange = (value: string) => {
    if (value.length <= MAX_SUMMARY_LENGTH) {
      setSummary(value);
    }
  };

  const handleGitHubUrlChange = (value: string) => {
    if (value.length <= MAX_GITHUB_LENGTH) {
      setGitHubUrl(value);
    }
  };

  const handleStackSelect = (stacks: string[]) => {
    setStacks(stacks);
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
    // 에디터 HTML string
    const editorHTML = quillRef.current.root.innerHTML;

    // 에디터 이미지 파일로 변환
    const editorImgFiles = base64sToFiles(
      findBase64(editorHTML),
      `${loginData ? loginData.user_id : 'e'}-${new Date().getTime()}`
    );

    // 에디터 이미지 서버 경로 추출
    const urls = editorImgFiles.map((file) => `${IMG_DOMAIN}/static/portfolio/${file.name}`);

    // base64 => 에디터 이미지 서버 경로로 대체
    const newDescription = base64imgSrcParser(editorHTML, urls);
    const formData = new FormData();

    // 썸네일 미리보기 이미지 파일 변환 && 썸네일 수정이 없는 경우 변환하지 않기
    const newThumbnailFile = thumbnailSrc.includes('base64')
      ? base64sToFiles(
          findBase64(thumbnailSrc),
          `thumbnail-${loginData ? loginData.user_id : 'e'}-${new Date().getTime()}`
        )[0]
      : null;

    // 썸네일 수정이 없는 경우는 append하지 않기
    newThumbnailFile !== null && formData.append('portfolio_img', newThumbnailFile as File);
    formData.append('portfolio_title', title);
    formData.append('portfolio_summary', summary);
    formData.append('portfolio_github', gitHubUrl);
    formData.append('portfolio_stacks', JSON.stringify(stacks || []));
    formData.append('portfolio_description', newDescription);
    editorImgFiles.length > 0 &&
      editorImgFiles.forEach((file) => formData.append('portfolio_img', file as File));
    formData.append('memberIds', JSON.stringify(members.map((info) => info.user_id) || []));

    const refFocusAndScroll = (targetRef: any) => {
      if (targetRef.current) {
        targetRef.current.focus();
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };

    console.log(newThumbnailFile);
    console.log(thumbnailSrc);

    if (!title) {
      alert('제목을 입력해 주세요.');
      refFocusAndScroll(titleRef!);
      return;
    } else if (!summary) {
      alert('요약을 입력해 주세요.');
      refFocusAndScroll(summaryRef!);
      return;
    } else if (!thumbnailSrc) {
      alert('썸네일을 등록해 주세요.');
      refFocusAndScroll(thumbnailRef!);
      return;
    } else if (editorHTML.length <= 12) {
      alert('내용이 너무 짧습니다.');
      refFocusAndScroll(quillRef!);
      return;
    } else if (!gitHubUrl) {
      alert('깃허브 레포지토리 url을 입력해 주세요.');
      refFocusAndScroll(githubRef!);
      return;
    } else {
      postData(formData);
    }
  };

  const handleSaveClick = () => {
    const editorHTML = quillRef.current!.root.innerHTML;
    if (
      thumbnailSrc.length === 0 &&
      title.length === 0 &&
      summary.length === 0 &&
      editorHTML.length === 0 &&
      gitHubUrl.length === 0 &&
      stacks.length === 0 &&
      members.length === 0
    ) {
      alert('최소 한 개 이상의 필드를 입력해 주세요.');
      return;
    }

    const form = {
      thumbnailSrc,
      title,
      summary,
      stacks,
      description: editorHTML,
      gitHubUrl,
      members,
    };
    localStorage.setItem('savedPortfolioPost', JSON.stringify(form));
    alert('임시저장 성공');
  };

  const handleImportSavedPost = () => {
    const savedPostData = localStorage.getItem('savedPortfolioPost');
    const postData = JSON.parse(savedPostData!);
    const confirm = window.confirm(
      '저장 된 글을 불러올 경우 현재 작성된 글은 지워집니다. 불러오겠습니까?'
    );

    if (confirm) {
      setThumbnailSrc(postData.thumbnailSrc);
      setThumbnailFile(null);
      setTitle(postData.title);
      setSummary(postData.summary);
      setStacks(postData.stacks);
      setGitHubUrl(postData.gitHubUrl);
      setMembers(postData.members);
      // 에디터 내용 불러오기
      quillRef.current.root.innerHTML = postData.description;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainFormContainer}>
        <h1 className={styles.title}>프로젝트 자랑 작성</h1>
        <div className={styles.topContainer}>
          <div>
            <h3 className={styles.required}>썸네일</h3>
            <ThumbnailInput
              innerRef={thumbnailRef}
              imgFile={thumbnailFile!}
              onInputChange={handleThumbnailSelect}
              thumbnailSrc={thumbnailSrc}
            />
          </div>
          <div>
            <label>
              <div className={styles.inputTop}>
                <h3 className={styles.required}>프로젝트 제목</h3>
                <LengthCheck valueLength={title ? title.length : 0} maxLength={MAX_TITLE_LENGTH} />
              </div>
              <TitleTextForm innerRef={titleRef} value={title} onChange={handleTitleChange} />
            </label>
            <label>
              <div className={styles.inputTop}>
                <h3 className={styles.required}>요약</h3>
                <LengthCheck
                  valueLength={summary ? summary.length : 0}
                  maxLength={MAX_SUMMARY_LENGTH}
                />
              </div>
              <BasicTextForm
                innerRef={summaryRef}
                value={summary}
                onChange={handleSummaryChange}
                placeholder={'프로젝트를 짧게 설명해 주세요.'}
              />
            </label>
          </div>
        </div>
        <div>
          <h3 className={styles.required}>내용</h3>
          <QuillEditor innerRef={quillRef} />
        </div>
        <label className={styles.gitHubContainer}>
          <div className={styles.inputTop}>
            <h3 className={styles.required}>깃허브 레포지토리 링크</h3>
            <LengthCheck
              valueLength={gitHubUrl ? gitHubUrl.length : 0}
              maxLength={MAX_GITHUB_LENGTH}
            />
          </div>
          <BasicTextForm
            innerRef={githubRef}
            value={gitHubUrl}
            onChange={handleGitHubUrlChange}
            placeholder={'URL을 입력해 주세요.'}
          />
        </label>
        <div className={styles.stacksContainer}>
          <h3 className={styles.stacksTitle}>사용 기술스택</h3>
          <Stack selectedStack={stacks} setStackList={handleStackSelect} />
        </div>
        <div>
          <div className={styles.inputTop}>
            <h3>참여 멤버</h3>
          </div>
          <MemberSelectForm
            selectedUserList={members}
            onMemberSelect={handleUserSelect}
            onMemberUnselect={handleUserUnselect}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        {isPostSaved && (
          <button className={styles.importButton} onClick={handleImportSavedPost}>
            임시저장 글 불러오기
          </button>
        )}
        <div>
          <button className={styles.saveButton} onClick={handleSaveClick}>
            임시 저장
          </button>
          <button className={styles.submitButton} onClick={handleSubmitClick}>
            {editMode ? '수정 완료' : '작성 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioWriting;
