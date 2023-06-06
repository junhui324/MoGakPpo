import styles from './ProjectPostButton.module.scss';
import ROUTES from '../../../constants/Routes';
import { useState, useEffect } from 'react';
import PostTypeSelectModal from './PostTypeSelectModal';
import { useRecoilValue, useRecoilState } from 'recoil';
import { classificationState } from '../../../recoil/projectState';
import { userTokenState } from '../../../recoil/userState';
import { getToken } from '../../../apis/Token';
import { useNavigate } from 'react-router-dom';

function ProjectPostButton() {
  const [buttonClick, setButtonClick] = useState(false);
  const classification = useRecoilValue(classificationState);
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    setUserToken(token);
  }, []);

  const handleButtonClick = () => {
    const token = getToken();
    setUserToken(token);

    if (userToken?.length === 0 || !userToken) {
      alert('로그인이 필요합니다.');
      navigate(`${ROUTES.LOGIN}`);
    } else {
      setButtonClick(true);
    }
  };
  return (
    <>
      <button
        className={`${styles.postButton} ${
          classification === 'modify' ? styles.nonePostButton : ''
        }`}
        // onClick={() => {
        //   navigate(`${ROUTES.CREATE}study`);
        // }}
        onClick={handleButtonClick}
      >
        ✏️ 모집글 작성하기
      </button>
      {buttonClick && <PostTypeSelectModal setModalOpen={setButtonClick} />}
    </>
  );
}
export default ProjectPostButton;
