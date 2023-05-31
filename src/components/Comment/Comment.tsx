import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
/**to-do
 * api호출 Fetcher 사용하기
 * interface 및 type 외부폴더로 옮기기
 */
interface CommentType {
  user_id: number;
  comment_id: number;
  comment_created_at: string;
  comment_content: string;
  commenter_img: string;
  commenter_name: string;
}
interface UserType {
  user_name: string;
  user_img: string;
}
const userToken = '';
export default function Comment() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [user, setUser] = useState<UserType>({} as UserType);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/mock/projects/project.json').then((res) => {
      setComments(res.data.project_comments);
      setUser(res.data.user_info[0]);
    });
  }, []);

  const handleSubmitButtonClick = () => {
    axios.post('http://localhost:3000/mock/projects/project.json', {
      comment_content: inputValue,
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => event.target.value);
  };

  const loggedInUserInput = () => {
    return (
      <div className={styles.loggedInInput}>
        <img src={user.user_img} alt="profile" />
        <input
          type="text"
          placeholder={`${user.user_name}님, 댓글을 작성해보세요.`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmitButtonClick}>
          등록하기
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>{comments.length}</strong>
        </h3>
        {!user ? (
          loggedInUserInput()
        ) : (
          <Link to="/login">
            <input type="text" placeholder="댓글을 작성해보세요." readOnly />
          </Link>
        )}
      </div>
      <ul className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className={styles.comment}>
              <div className={styles.header}>
                <img src={comment.commenter_img} alt="profile" />
                <div className={styles.subHeader}>
                  <h3>{comment.commenter_name}</h3>
                  <p>{comment.comment_created_at}</p>
                </div>
              </div>
              <p className={styles.content}>{comment.comment_content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
