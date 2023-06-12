//패키지
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
//Type, Api
import { TypeComment } from '../../interfaces/Comment.interface';
import {
  getComment,
  postComment,
  putComment,
  deleteComment,
  getProject,
  getPortfolio,
} from '../../apis/Fetcher';
//util,모듈,컴포넌트
import getDateFormat from '../../utils/getDateFormat';
import CommentModal from './CommentModal';
import Pagination from '../../components/Pagination';
//이미지,아이콘,CSS
import styles from './Comment.module.scss';
import DefaultUserImg from '../../assets/DefaultUser.png';
import NoContentImage from '../../assets/NoContent.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilState } from 'recoil';

export default function Comment() {
  const LoginData = useRecoilState(loginAtom);
  const user = LoginData[0];
  console.log('🚀 ~ file: index.tsx:30 ~ Comment ~ user:', user);
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [isListUpdated, setIsListUpdated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const postTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [authorId, setAuthorId] = useState<number>(0);
  //라우팅관련
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const postId = Number(params.id) || 0;
  const [postType, setPostType] = useState<'project' | 'portfolio'>('project');
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'projects') {
      setPostType('project');
    }
    if (location.pathname.split('/')[1] === 'portfolios') {
      setPostType('portfolio');
    }
  }, []);

  //코멘트 api get요청
  const getCommentData = useCallback(async () => {
    try {
      const getPostType = location.pathname.split('/')[1];
      const response = await getComment(getPostType, postId, currPage + 1);
      setComments(response.data.pagenatedComments);
      setCommentTotal(response.data.listLength);
      setTotalPageCount(response.data.pageSize);
    } catch (error) {
      console.log(error);
    }
  }, [isListUpdated, postId, currPage]);
  useEffect(() => {
    getCommentData();
  }, [getCommentData]);

  //게시글 작성자 정보 받아오기
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const getPostType = location.pathname.split('/')[1];
        if (getPostType === 'projects') {
          const response = await getProject(postId);
          setAuthorId(response.user_id);
        }
        if (getPostType === 'portfolios') {
          const response = await getPortfolio(String(postId));
          setAuthorId(response.user_id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  //댓글 수정 시 value의 초깃값을 기존 댓글 내용으로 설정함
  useEffect(() => {
    const comment = comments?.find((comment) => comment.comment_id === editingCommentId);
    if (editTextareaRef.current) {
      editTextareaRef.current.value = comment?.comment_content || '';
      editTextareaRef.current.focus();
    }
  }, [comments, editingCommentId]);

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
      if (!postTextareaRef.current?.value) {
        alert('댓글을 입력해주세요.');
      }
      //신규 댓글 등록
      try {
        switch (postType) {
          case 'project':
            await postComment(postType, {
              project_id: postId,
              comment_content: postTextareaRef.current?.value || '',
            });
            break;
          case 'portfolio':
            await postComment(postType, {
              portfolio_id: postId,
              comment_content: postTextareaRef.current?.value || '',
            });
            break;
        }
        setIsListUpdated(!isListUpdated);
        setIsInputClicked(!isInputClicked);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className={styles.commentInputArea}>
        <TextareaAutosize
          autoFocus
          minRows={3}
          maxRows={12}
          placeholder="댓글을 작성해보세요."
          ref={postTextareaRef}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.defaultButton} type="submit" onClick={handleSubmitButtonClick}>
            등록
          </button>
          <button
            className={styles.lineButton}
            onClick={() => {
              if (postTextareaRef.current) postTextareaRef.current.value = '';
              setIsInputClicked(!isInputClicked);
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
          placeholder="댓글을 작성해보세요."
          readOnly
          onClick={() => navigate('/login', { state: { returnPath: location.pathname } })}
        />
      </>
    );
  };

  let inputComponent;
  if (!user.user_id) {
    inputComponent = loggedOutUserInput();
  } else if (user.user_id && !isInputClicked) {
    inputComponent = loggedInUserInput();
  } else if (user.user_id && isInputClicked) {
    inputComponent = loggedInUserInputClicked();
  }

  return (
    <div className={styles.commentContainer}>
      <h3 className={styles.commentCount}>
        댓글 <strong>{commentTotal}</strong>
      </h3>
      {/* 댓글리스트 영역 */}
      {commentTotal === 0 ? (
        <div className={styles.noComment}>
          <img src={NoContentImage} alt="No Content" />
          <p>
            아직 댓글이 없어요.
            <br />첫 번째 댓글을 남겨보세요!
          </p>
        </div>
      ) : (
        <ul className={styles.commentList}>
          {comments &&
            comments.map((comment) => {
              //수정, 삭제버튼 이벤트 처리
              const isEditing = editingCommentId === comment.comment_id;
              const handleDeleteButtonClick = async () => {
                if (window.confirm('댓글을 삭제하시겠습니까?')) {
                  try {
                    await deleteComment(postType, comment.comment_id);
                    setIsListUpdated(!isListUpdated);
                  } catch (error) {
                    console.log(error);
                  }
                }
              };
              const handleEditButtonClick = () => {
                setEditingCommentId(comment.comment_id);
              };
              const handleEditSubmitButtonClick = async () => {
                if (!editTextareaRef.current?.value) {
                  alert('댓글을 입력해주세요.');
                }
                try {
                  await putComment(postType, comment.comment_id, {
                    comment_content: editTextareaRef.current?.value || '',
                  });
                  setIsListUpdated(!isListUpdated);
                  setEditingCommentId(null);
                } catch (error) {
                  console.log(error);
                }
              };
              const handleCopyButtonClick = async () => {
                await navigator.clipboard.writeText(comment.comment_content);
                alert('복사되었습니다.');
                setModalOpen(false);
              };
              // 코멘트리스트 렌더링
              return (
                <li key={comment.comment_id} className={styles.comment}>
                  <div className={styles.header}>
                    <Link
                      to={
                        comment.user_id === Number(user?.user_id)
                          ? '/user/mypage'
                          : `/user/${comment.user_id}`
                      }
                    >
                      <img src={comment.user_img || DefaultUserImg} alt="profile" />
                    </Link>
                    <div className={styles.subHeader}>
                      <Link
                        to={
                          comment.user_id === Number(user?.user_id)
                            ? '/user/mypage'
                            : `/user/${comment.user_id}`
                        }
                      >
                        <h3>{comment.user_name}</h3>
                        {comment.user_id === authorId && <span>작성자</span>}
                      </Link>
                      <p>{getDateFormat(comment.comment_created_at)}</p>
                    </div>
                    <div className={styles.dotButton}>
                      <BsThreeDotsVertical
                        onClick={() => {
                          setSelectedCommentId(comment.comment_id);
                          setModalOpen(true);
                        }}
                      />
                      <CommentModal
                        modalOpen={modalOpen && selectedCommentId === comment.comment_id}
                        setModalOpen={setModalOpen}
                        isMyComment={comment.user_id === Number(user?.user_id)}
                        onClickEdit={handleEditButtonClick}
                        onClickDelete={handleDeleteButtonClick}
                        onClickCopy={handleCopyButtonClick}
                      />
                    </div>
                  </div>
                  {isEditing ? (
                    <TextareaAutosize minRows={3} maxRows={12} ref={editTextareaRef} />
                  ) : (
                    <TextareaAutosize
                      readOnly
                      className={styles.content}
                      value={comment.comment_content}
                    />
                  )}
                  {/* 로그인한 유저가 작성한 댓글이면서, 수정버튼을 클릭한 경우 */}
                  {comment.user_id === Number(user?.user_id) && isEditing && (
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.defaultButton}
                        onClick={handleEditSubmitButtonClick}
                      >
                        등록
                      </button>
                      <button
                        className={styles.lineButton}
                        onClick={() => setEditingCommentId(null)}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      )}
      {/* 댓글리스트 영역 끝 */}
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={Math.ceil(totalPageCount)}
      />
      <div className={styles.inputArea}>{inputComponent}</div>
    </div>
  );
}
