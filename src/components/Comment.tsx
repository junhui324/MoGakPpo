import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';

interface CommentType {
  comment_id: number;
  comment_created_at: string;
  comment_content: string;
}

export default function Comment() {
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    axios.get('http://localhost:3000/mock/data.json').then((res) => {
      setComments(res.data.comment);
    });
  }, []);
  console.log(comments);
  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>3</strong>
        </h3>
        <input type="text" placeholder="댓글을 작성해보세요." readOnly />
      </div>
      <ul className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className={styles.userInfo}>
              <p>{comment.comment_created_at}</p>
              <p>{comment.comment_content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
