//패키지
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
//Type, Api
import { TypeComment } from '../../interfaces/Comment.interface';
import { putComment, deleteComment } from '../../apis/Fetcher';
//util,모듈,컴포넌트
import getDateFormat from '../../utils/getDateFormat';
import CommentModal from './CommentModal';
//이미지,아이콘,CSS
import styles from './Comment.module.scss';
import DefaultUserImg from '../../assets/DefaultUser.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxCornerBottomLeft } from 'react-icons/rx';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilState } from 'recoil';

type TypeCommentItemProps = {
  initComments: TypeComment[];
  comments: TypeComment[];
  authorData: { user_id: number } | null;
  postType: 'project' | 'portfolio';
  checkUpdate: () => void;
};

export default function CommentItem({
  initComments,
  comments,
  authorData,
  postType,
  checkUpdate,
}: TypeCommentItemProps) {
  const LoginData = useRecoilState(loginAtom);
  const user = LoginData[0];
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const editTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const findRef = (refId: number): TypeComment | undefined => {
    const parent = initComments.find((comment) => comment.comment_id === refId);
    return parent;
  };
  //댓글 수정 시 value의 초깃값을 기존 댓글 내용으로 설정함
  useEffect(() => {
    const comment = comments?.find((comment) => comment.comment_id === editingCommentId);
    if (editTextareaRef.current) {
      editTextareaRef.current.value = comment?.comment_content || '';
      editTextareaRef.current.focus();
    }
  }, [comments, editingCommentId]);

  return (
    <ul className={styles.commentList}>
      {comments.map((comment) => {
        //수정, 삭제버튼 이벤트 처리
        const isEditing = editingCommentId === comment.comment_id;
        const handleDeleteButtonClick = async () => {
          if (window.confirm('댓글을 삭제하시겠습니까?')) {
            try {
              await deleteComment(postType, comment.comment_id);
              checkUpdate();
            } catch (error) {
              console.log(error);
            }
          }
        };
        const handleEditButtonClick = () => {
          setEditingCommentId(comment.comment_id);
          setModalOpen(false);
        };
        const handleEditSubmitButtonClick = async () => {
          if (!editTextareaRef.current?.value) {
            alert('댓글을 입력해주세요.');
          }
          try {
            await putComment(postType, comment.comment_id, {
              comment_content: editTextareaRef.current?.value || '',
            });
            checkUpdate();
            setEditingCommentId(null);
          } catch (error) {
            console.log(error);
          }
        };
        // clipboard api 지원하지 않는 경우 execCommand사용
        const handleCopyButtonClick = async () => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(comment.comment_content);
            alert('복사되었습니다.');
            setModalOpen(false);
          } else {
            const copyField = document.createElement('textarea');
            copyField.value = comment.comment_content;
            document.body.appendChild(copyField);
            copyField.select();
            document.execCommand('copy');
            document.body.removeChild(copyField);
            alert('복사되었습니다.');
            setModalOpen(false);
          }
        };
        // 코멘트리스트 렌더링
        return (
          <>
            <li key={comment.comment_id} className={styles.comment}>
              {comment.ref_id && (
                <div className={styles.replyIcon}>
                  <RxCornerBottomLeft />
                </div>
              )}
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
                    {comment.user_id === authorData?.user_id && <span>작성자</span>}
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
                <TextareaAutosize minRows={3} ref={editTextareaRef} maxLength={150} />
              ) : (
                <div className={styles.replyMention}>
                  {comment.ref_id && <h3>@{findRef(comment.ref_id)?.user_name}</h3>}
                  <TextareaAutosize
                    readOnly
                    className={styles.content}
                    value={comment.isDeleted ? '삭제된 댓글입니다.' : comment.comment_content}
                  />
                </div>
              )}
              {isEditing && (
                <div className={styles.buttonContainer}>
                  <button className={styles.defaultButton} onClick={handleEditSubmitButtonClick}>
                    등록
                  </button>
                  <button className={styles.lineButton} onClick={() => setEditingCommentId(null)}>
                    취소
                  </button>
                </div>
              )}
            </li>
            {/* 대댓글 렌더링 */}
            <div className={styles.reply}>
              {comment.replies && comment.replies.length > 0 && (
                <CommentItem
                  initComments={comments}
                  comments={comment.replies}
                  authorData={authorData}
                  postType={postType}
                  checkUpdate={checkUpdate}
                />
              )}
            </div>
          </>
        );
      })}
    </ul>
  );
}
