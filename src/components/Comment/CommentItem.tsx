//pagenatedComments배열 관련 로직만 남기기

import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import getDateFormat from '../../utils/getDateFormat';

import styles from './Comment.module.scss';
import DefaultUserImg from '../../assets/DefaultUser.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilState } from 'recoil';
import Reply from './Reply';
//@ts-ignore
export default function CommentItem({ comments }) {
  const LoginData = useRecoilState(loginAtom);
  const user = LoginData[0];
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.commentContainer}>
      {
        <ul className={styles.commentList}>
          {comments &&
            comments.map((comment: any) => (
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
                      {/* {comment.user_id === authorId && <span>작성자</span>} */}
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
                    {/* <CommentModal
                        modalOpen={modalOpen && selectedCommentId === comment.comment_id}
                        setModalOpen={setModalOpen}
                        isMyComment={comment.user_id === Number(user?.user_id)}
                        onClickEdit={handleEditButtonClick}
                        onClickDelete={handleDeleteButtonClick}
                        onClickCopy={handleCopyButtonClick}
                      /> */}
                  </div>
                </div>
                <TextareaAutosize
                  readOnly
                  className={styles.content}
                  value={comment.isDeleted ? '삭제된 댓글입니다.' : comment.comment_content}
                />
                {comment.replies && comment.replies.length > 0 && (
                  <Reply replies={comment.replies} />
                )}
              </li>
            ))}
        </ul>
      }
    </div>
  );
}
