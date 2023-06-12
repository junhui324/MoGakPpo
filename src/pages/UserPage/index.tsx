import { useEffect, useState } from 'react';
import Profile from '../../components/UserProfile';
import Tab from './Tab';
import Posts from './Posts';

function UserPage() {
  const tabs = ['게시글'];
  const [currTab, setCurrTab] = useState<string>('게시글');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleClickTab(tab: string) {
    setCurrTab(tab);
  }
  function handleContentsError(message: string) {
    setErrorMessage(message);
  }
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);
  return (
    <div>
      <Profile />
      <Tab tabs={tabs} currTab={currTab} onClick={handleClickTab} />
      {!errorMessage && currTab === '게시글' && <Posts onError={handleContentsError} />}
    </div>
  );
}

export default UserPage;
