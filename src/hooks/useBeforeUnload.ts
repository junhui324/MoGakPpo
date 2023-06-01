import { useEffect } from 'react';

const useBeforeUnload = () => {
  // 브라우저 나가기, 새로고침 이벤트 핸들러
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = ''; // 메세지 표시
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

export default useBeforeUnload;