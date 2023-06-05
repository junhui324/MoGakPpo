import styles from './ProjectPostButton.module.scss';
// import { useNavigate } from 'react-router-dom';
// import ROUTES from '../../../constants/Routes';
import { useState } from 'react';
import PostTypeSelectModal from './PostTypeSelectModal';

function ProjectPostButton() {
  const [buttonClick, setButtonClick] = useState(false);
  return (
    <>
      <button
        className={styles.postButton}
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
