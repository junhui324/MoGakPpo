import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';

interface CommentType {
  user_id: number;
  comment_id: number;
  comment_created_at: string;
  comment_content: string;
}
interface UserType {
  user_id: number;
  user_name: string;
  user_img: string;
}

export default function Comment() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mock/data.json').then((res) => {
      setComments(res.data.comment);
      setUsers(res.data.user);
    });
  }, []);

  const getUserInfo = (userId: number) => {
    const user = users.find((user) => user.user_id === userId);
    return { userName: user?.user_name, userImg: user?.user_img };
  };

  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>{comments.length}</strong>
        </h3>
        <input type="text" placeholder="댓글을 작성해보세요." readOnly />
      </div>
      <ul className={styles.commentList}>
        {comments.map((comment) => {
          const { userName, userImg } = getUserInfo(comment.comment_id);
          return (
            <li key={comment.comment_id} className={styles.userInfo}>
              <div className={styles.commentHeader}>
                <img src={userImg} alt="profile" />
                <div className={styles.commentSubHeader}>
                  <p>{userName}</p>
                  <p>{comment.comment_created_at}</p>
                </div>
              </div>
              <p className={styles.comment}>{comment.comment_content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
