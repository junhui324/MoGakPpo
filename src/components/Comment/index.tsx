import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { TypeComment } from '../../interfaces/Comment.interface';
import { TypeUser } from '../../interfaces/User.interface';
import { getComment, postComment, putComment, deleteComment } from '../../apis/Fetcher';
import getUserInfo from '../../utils/getUserInfo';
import getDateFormat from '../../utils/getDateFormat';
import DefaultUserImg from '../../assets/DefaultUser.png';

export default function Comment() {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [user, setUser] = useState<TypeUser | null>(null);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editInputValue, setEditInputValue] = useState<string | undefined>(undefined);
  const [isListUpdated, setIsListUpdated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  //라우팅관련
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const projectId = Number(params.id) || 0;

  //코멘트 api get요청
  const getCommentData = async () => {
    const commentList = await getComment(projectId);
    //@ts-ignore
    setComments(commentList.data);
  };
  useEffect(() => {
    getCommentData();
  }, [isListUpdated]);

  //댓글 수정 시 value의 초깃값을 기존 댓글 내용으로 설정함
  useEffect(() => {
    const comment = comments.find((comment) => comment.comment_id === editingCommentId);
    setEditInputValue(comment?.comment_content);
  }, [comments, editingCommentId]);

  //유저 정보 localStorage에서 받아오기
  useEffect(() => {
    const user = getUserInfo();
    setUser(user);
  }, []);

  //로그인 한 유저일 경우 렌더링되는 인풋영역
  const loggedInUserInput = () => {
    return (
      <>
        <div className={styles.loggedInInput}>
          <img src={user?.user_img || DefaultUserImg} alt="profile" />
          <input
            type="text"
            placeholder={`${user?.user_name}님, 댓글을 작성해보세요.`}
            readOnly
            onClick={() => setIsInputClicked(!isInputClicked)}
          />
        </div>
      </>
    );
  };
  //로그인 한 유저가 인풋 클릭한 경우 에디터로 변경
  const loggedInUserInputClicked = () => {
    const handleSubmitButtonClick = async () => {
      //신규 댓글 등록
      try {
        const response = await postComment({
          project_id: projectId,
          comment_content: inputValue,
        });
        console.log('🚀 ~ file: index.tsx:72 ~ handleSubmitButtonClick ~ response:', response);

        //@ts-ignore
        if (response.message === '모집 글 댓글 등록 성공') {
          setIsListUpdated(!isListUpdated);
          // setComments((current) => [response.data, ...current]);
        }
        setIsInputClicked(!isInputClicked);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className={styles.commentInputArea}>
        <textarea
          placeholder="2차구현-에디터로 변경하기"
          value={inputValue}
          onChange={(event) => setInputValue(() => event.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.defaultButton} type="submit" onClick={handleSubmitButtonClick}>
            등록
          </button>
          <button className={styles.lineButton} onClick={() => setIsInputClicked(!isInputClicked)}>
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
          type="text"
          placeholder="댓글을 작성해보세요."
          readOnly
          onClick={() => navigate('/login', { state: { returnPath: location.pathname } })}
        />
      </>
    );
  };

  let inputComponent;
  if (!user) {
    inputComponent = loggedOutUserInput();
  } else if (user && !isInputClicked) {
    inputComponent = loggedInUserInput();
  } else if (user && isInputClicked) {
    inputComponent = loggedInUserInputClicked();
  }

  return (
    <div className={styles.commentContainer}>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>{comments.length}</strong>
        </h3>
        {inputComponent}
      </div>
      <ul className={styles.commentList}>
        {comments.map((comment) => {
          //수정, 삭제버튼 이벤트 처리
          const isEditing = editingCommentId === comment.comment_id;
          const handleDeleteButtonClick = async () => {
            try {
              const response = await deleteComment(comment.comment_id);
              //@ts-ignore
              if (response.message === '댓글 삭제 성공') {
                setIsListUpdated(!isListUpdated);
              }
            } catch (error) {
              console.log(error);
            }
          };
          const handleEditButtonClick = () => {
            setEditingCommentId(comment.comment_id);
          };
          const handleEditSubmitButtonClick = async () => {
            try {
              const response = await putComment(comment.comment_id, {
                //@ts-ignore
                comment_content: editInputValue,
              });
              //@ts-ignore
              if (response.message === '댓글 수정 성공') {
                setIsListUpdated(!isListUpdated);
              }
              setEditingCommentId(null);
            } catch (error) {
              console.log(error);
            }
          };

          return (
            <li key={comment.comment_id} className={styles.comment}>
              <div className={styles.header}>
                <Link to={`/user/${comment.user_id}`}>
                  <img src={comment.user_img || DefaultUserImg} alt="profile" />
                </Link>
                <div className={styles.subHeader}>
                  <Link to={`/user/${comment.user_id}`}>
                    <h3>{comment.user_name}</h3>
                  </Link>
                  <p>{getDateFormat(comment.comment_created_at)}</p>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={editInputValue}
                  onChange={(event) => setEditInputValue(() => event.target.value)}
                />
              ) : (
                <p className={styles.content}>{comment.comment_content}</p>
              )}
              {/* 로그인한 유저가 작성한 댓글인 경우 수정/삭제버튼 노출 */}
              {comment.user_id === user?.user_id &&
                (isEditing ? (
                  <div className={styles.buttonContainer}>
                    <button className={styles.defaultButton} onClick={handleEditSubmitButtonClick}>
                      등록
                    </button>
                    <button className={styles.lineButton} onClick={() => setEditingCommentId(null)}>
                      취소
                    </button>
                  </div>
                ) : (
                  <div className={styles.buttonContainer}>
                    <button className={styles.defaultButton} onClick={handleEditButtonClick}>
                      수정
                    </button>
                    <button className={styles.lineButton} onClick={handleDeleteButtonClick}>
                      삭제
                    </button>
                  </div>
                ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
