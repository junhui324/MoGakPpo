import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../../components/Profile';
import Tab from '../../components/MyPage/Tab';
import Posts from '../../components/MyPage/Posts';
import Comments from '../../components/MyPage/Comments';
import BookMarks from '../../components/MyPage/BookMarks';
import styles from './myPage.module.scss';
import ROUTES from '../../constants/Routes';

function MyPage() {
  const tabs = ['게시글', '댓글', '북마크'];
  const [currTab, setCurrTab] = useState<string>('게시글');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleClickTab(tab: string) {
    setCurrTab(tab);
  }

  function handleContentsError(message: string) {
    setErrorMessage(message);
  }
  
  function handleProfileError(message: string) {
    setErrorMessage(message);
  }

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      navigate(`${ROUTES.LOGIN}`);
    }
  }, [errorMessage, navigate]);

  return (
    <div className={styles.container}>
      <Profile onError={handleProfileError}/>
      <Tab tabs={tabs} currTab={currTab} onClick={handleClickTab} />
      {!errorMessage && currTab === '게시글' && <Posts onError={handleContentsError} />}
      {!errorMessage && currTab === '댓글' && <Comments onError={handleContentsError} />}
      {!errorMessage && currTab === '북마크' && <BookMarks onError={handleContentsError} />}
    </div>
  );
}

export default MyPage;
