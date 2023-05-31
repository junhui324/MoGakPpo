import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { TypeComment } from '../../interfaces/Comment.interface';
import { TypeUser } from '../../interfaces/User.interface';

const userToken = '';
export default function Comment() {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [user, setUser] = useState<TypeUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3000/mock/project/comment.json').then((res) => {
      setComments(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:3000/mock/user.json').then((res) => {
      setUser(res.data);
    });
  }, []);

  //로그인 한 유저일 경우 렌더링되는 인풋영역
  const loggedInUserInput = () => {
    return (
      <>
        <div className={styles.loggedInInput}>
          <img src={user?.user_img} alt="profile" />
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
    const handleSubmitButtonClick = () => {
      axios.post('http://localhost:3000/mock/projects/1.json', {
        comment_content: inputValue,
      });
    };
    return (
      <>
        <input type="text" placeholder="2차구현-에디터로 변경하기" />
        <button type="submit" onClick={handleSubmitButtonClick}>
          등록
        </button>
        <button onClick={() => setIsInputClicked(!isInputClicked)}>취소</button>
      </>
    );
  };
  //로그인 하지 않은 유저일 경우 인풋영역
  const loggedOutUserInput = () => {
    return (
      <>
        <Link to={'/login'} state={{ returnPath: location.pathname }}>
          <input type="text" placeholder="댓글을 작성해보세요." readOnly />
        </Link>
      </>
    );
  };

  let inputComponent;
  if (!isLoggedIn) {
    inputComponent = loggedOutUserInput();
  } else if (isLoggedIn && !isInputClicked) {
    inputComponent = loggedInUserInput();
  } else if (isLoggedIn && isInputClicked) {
    inputComponent = loggedInUserInputClicked();
  }
  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>{comments.length}</strong>
        </h3>
        {inputComponent}
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
