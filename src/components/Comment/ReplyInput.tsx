import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { postComment } from '../../apis/Fetcher';

//이미지,아이콘,CSS
import styles from './Comment.module.scss';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilState } from 'recoil';

type TypeCommentInputProps = {
  postType: 'project' | 'portfolio';
  checkUpdate: () => void;
  parentId: number | null;
  setIsReplyClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReplyInput({
  postType,
  checkUpdate,
  parentId,
  setIsReplyClicked,
}: TypeCommentInputProps) {
  const LoginData = useRecoilState(loginAtom);
  const user = LoginData[0];
  const postTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  //라우팅관련
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const postId = Number(params.id) || 0;

  const loggedInUserInputClicked = () => {
    const handleSubmitButtonClick = async () => {
      if (!postTextareaRef.current?.value) {
        alert('내용을 입력해주세요.');
        return;
      }
      //신규 댓글 등록
      try {
        switch (postType) {
          case 'project':
            await postComment(postType, {
              project_id: postId,
              comment_content: postTextareaRef.current?.value || '',
              parent_id: parentId,
            });
            break;
          case 'portfolio':
            await postComment(postType, {
              portfolio_id: postId,
              comment_content: postTextareaRef.current?.value || '',
              parent_id: parentId,
            });
            break;
        }
        checkUpdate();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className={styles.commentInputArea}>
        <TextareaAutosize
          autoFocus
          minRows={3}
          placeholder="답글을 작성해보세요."
          ref={postTextareaRef}
          maxLength={150}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.defaultButton} type="submit" onClick={handleSubmitButtonClick}>
            등록
          </button>
          <button
            className={styles.lineButton}
            onClick={() => {
              setIsReplyClicked((prev) => !prev);
            }}
          >
            취소
          </button>
        </div>
      </div>
    );
  };
  //로그인 하지 않은 유저일 경우 인풋영역->로그인페이지로 연결됨
  const loggedOutUserInput = () => {
    return (
      <>
        <input
          className={styles.loggedOutInput}
          type="text"
          placeholder="로그인 후 답글을 작성해보세요."
          readOnly
          onClick={() => navigate('/login', { state: { returnPath: location.pathname } })}
        />
      </>
    );
  };

  let inputComponent;
  if (!user.user_id) {
    inputComponent = loggedOutUserInput();
  } else {
    inputComponent = loggedInUserInputClicked();
  }

  return <div className={`${styles.inputArea} ${styles.replyInput}`}>{inputComponent}</div>;
}
