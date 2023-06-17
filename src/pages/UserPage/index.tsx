import { useState } from 'react';
import Profile from '../../components/UserProfile';
import Tab from './Tab';
import Posts from './Posts';

function MyPage() {
  const tabs = ['게시글'];
  const [currTab, setCurrTab] = useState<string>('게시글');

  function handleClickTab(tab: string) {
    setCurrTab(tab);
  }

  return (
    <div>
      <Profile />
      <Tab tabs={tabs} currTab={currTab} onClick={handleClickTab} />
      {currTab === '게시글' && <Posts />}
    </div>
  );
}

export default MyPage;
