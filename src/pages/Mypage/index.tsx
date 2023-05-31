import { useState } from 'react';
import Profile from '../../components/Profile';
import Tab from './Tab';

function Mypage() {
  const [currTab, setCurrTab] = useState<string>('게시글');

  function handleClickTab(tab: string) {
    setCurrTab(tab);
  }

  return (
    <div>
      <Profile />
      <Tab currTab={currTab} onClick={handleClickTab}/>
    </div>
  );
}

export default Mypage;
