import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { TypeComment, TypeUserInfo } from '../../interfaces/Project.interface';

const userToken = '';
export default function Comment() {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [user, setUser] = useState<TypeUserInfo | null>(null);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3000/mock/projects/1.json').then((res) => {
      setComments(res.data.project_comments.commentList);
      setUser(res.data.user_info);
    });
  }, []);

  const handleSubmitButtonClick = () => {
    axios.post('http://localhost:3000/mock/projects/1.json', {
      comment_content: inputValue,
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => event.target.value);
  };

  //로그인 한 유저일 경우 렌더링되는 인풋영역
  const loggedInUserInput = () => {
    return (
      <div className={styles.loggedInInput}>
        <img src={user?.user_img} alt="profile" />
        <input
          type="text"
          placeholder={`${user?.user_name}님, 댓글을 작성해보세요.`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmitButtonClick}>
          등록
        </button>
      </div>
    );
  };
  //로그인 하지 않은 유저일 경우 인풋영역
  const loggedOutUserInput = () => {
    return (
      <Link to={'/login'} state={{ returnPath: location.pathname }}>
        <input type="text" placeholder="댓글을 작성해보세요." readOnly />
      </Link>
    );
  };

  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>{comments.length}</strong>
        </h3>
        {user ? loggedInUserInput() : loggedOutUserInput()}
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
