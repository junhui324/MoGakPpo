import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeComment } from '../../interfaces/Comment.interface';
import { TypeUser } from '../../interfaces/User.interface';

const userToken = '';
export default function Comment() {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [user, setUser] = useState<TypeUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/mock/project/comment.json').then((res) => {
      setComments(res.data);
    });
  }, [isUpdated]);
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
    const handleSubmitButtonClick = async () => {
      //todo-commenter id필요->userid와 대조하여 본인이 작성한 댓글 로직 처리
      try {
        const response = await axios.post('http://localhost:3000/mock/projects/1.json', {
          comment_content: inputValue,
        });
        if (response.status === 200) {
          setIsUpdated(!isUpdated);
        }
      } catch (error) {
        console.log(error);
      }
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
          //수정, 삭제버튼 이벤트 처리
          const handleDeleteButtonClick = () => {
            axios.delete(`http://localhost:3000/mock/projects/1/${comment.comment_id}.json`);
          };
          const handleEditButtonClick = () => {
            //todo - isEditClicked state생성, edit클릭시 input창보이게, 수정버튼->등록/삭제->취소
            axios.patch('http://localhost:3000/mock/projects/1.json', {
              comment_id: comment.comment_id,
              comment_content: comment.comment_content,
            });
          };
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
              {/* 로그인한 유저가 작성한 댓글인 경우 수정/삭제버튼 노출 */}
              {comment.commenter_id === user?.user_id && (
                <div>
                  <button onClick={handleEditButtonClick}>수정</button>
                  <button onClick={handleDeleteButtonClick}>삭제</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
