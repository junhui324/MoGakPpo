import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompleteListModal.module.scss';
import ModalFullScreen from '../common/Modal/ModalFullScreen';
import { useSetRecoilState } from 'recoil';
import { selectedPostTitleState } from '../../recoil/portfolioState';
import { getCompletedProject } from '../../apis/Fetcher';
import { TypeCompleteProjects } from '../../interfaces/Project.interface';
import * as Token from '../../apis/Token';
import ROUTES from '../../constants/Routes';
interface CompleteListModalProps {
  setModalOpen: (value: boolean) => void;
}

function CompleteListModal({ setModalOpen }: CompleteListModalProps) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [projects, setProjects] = useState<TypeCompleteProjects[]>();
  const setSelectedTitle = useSetRecoilState(selectedPostTitleState);

  const handleClickTitle = (id: number, title: string) => {
    setSelectedTitle(() => ({ id, title }));
    setModalOpen(false);
  };

  useEffect(() => {
    const getCompletedProjectList = async () => {
      try {
        const { data } = await getCompletedProject();
        setCount(data.listLength);
        setProjects(data.completedProjects);
      } catch (error) {
        if (error instanceof Error && typeof error.message === 'string') {
          switch (error.message) {
            case '401':
              alert(`로그인 후 다시 이용해주세요.`);
              Token.removeToken();
              navigate(ROUTES.LOGIN);
              break;
            default:
              alert(`${error}: 예기치 못한 서버 오류입니다.`);
              navigate(ROUTES.MAIN);
          }
        }
      }
    };

    getCompletedProjectList();
  }, []);

  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div className={styles.container}>
        <div className={styles.countText}>
          모집 완료한 게시글이 <span className={styles.count}>{count}</span>개 있네요!
        </div>
        {count > 0 && <div className={styles.desc}>작성하고 싶은 게시글 제목을 클릭해주세요</div>}
        {count > 0 && projects && (
          <div className={styles.titleContainer}>
            <div className={styles.titleList}>
              {projects.map((project, id) => {
                const title = project.project_title;
                return (
                  <div
                    className={styles.title}
                    key={`${title}-${id}`}
                    onClick={() => handleClickTitle(id, title)}
                  >
                    {project.project_id}. {title}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ModalFullScreen>
  );
}

export default CompleteListModal;
