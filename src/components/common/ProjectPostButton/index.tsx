import styles from './ProjectPostButton.module.scss';
// import { useNavigate } from 'react-router-dom';
// import ROUTES from '../../../constants/Routes';
import { useState } from 'react';
import PostTypeSelectModal from './PostTypeSelectModal';
import { useRecoilValue } from 'recoil';
import { classificationState } from '../../../recoil/projectState';

function ProjectPostButton() {
  const [buttonClick, setButtonClick] = useState(false);
  const classification = useRecoilValue(classificationState);

  return (
    <>
      <button
        className={`${styles.postButton} ${
          classification === 'modify' ? styles.nonePostButton : ''
        }`}
        // onClick={() => {
        //   navigate(`${ROUTES.CREATE}study`);
        // }}
        onClick={() => setButtonClick(true)}
      >
        ✏️ 모집글 작성하기
      </button>
      {buttonClick && <PostTypeSelectModal setModalOpen={setButtonClick} />}
    </>
  );
}
export default ProjectPostButton;
