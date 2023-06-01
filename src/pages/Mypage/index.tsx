import { useState } from 'react';
import Profile from '../../components/Profile';
import Tab from './Tab';
import Posts from './Posts';
import Comments from './Comments';
import BookMarks from './BookMarks';

function Mypage() {
  const tabs = ['게시글', '댓글', '북마크'];
  const [currTab, setCurrTab] = useState<string>('게시글');

  function handleClickTab(tab: string) {
    setCurrTab(tab);
  }

  return (
    <div>
      <Profile />
      <Tab tabs={tabs} currTab={currTab} onClick={handleClickTab}/>
      {currTab === '게시글' && <Posts/> }
      {currTab === '댓글' && <Comments/> }
      {currTab === '북마크' && <BookMarks/> }
    </div>
  );
}

export default Mypage;
