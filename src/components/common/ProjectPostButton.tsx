import styles from './ProjectPostButton.module.scss';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';

function ProjectPostButton() {
  const navigate = useNavigate();
  return (
    <button
      className={styles.postButton}
      onClick={() => {
        navigate(`${ROUTES.CREATE}study`);
      }}
    >
      ✏️ 모집글 작성하기
    </button>
  );
}
export default ProjectPostButton;
