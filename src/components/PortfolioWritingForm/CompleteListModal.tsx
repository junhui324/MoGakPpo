import { useEffect, useState } from 'react';
import styles from './CompleteListModal.module.scss';
import ModalFullScreen from '../common/Modal/ModalFullScreen';
import { useSetRecoilState } from 'recoil';
import { selectedPostTitleState } from '../../recoil/portfolioState';
import { getCompletedProject } from '../../apis/Fetcher';
import { TypeCompleteProjects } from '../../interfaces/Project.interface';

interface CompleteListModalProps {
  setModalOpen: (value: boolean) => void;
}

function CompleteListModal({ setModalOpen }: CompleteListModalProps) {
  const [count, setCount] = useState(0);
  const [projects, setProjects] = useState<TypeCompleteProjects[]>();
  const setSelectedTitle = useSetRecoilState(selectedPostTitleState);

  const handleClickTitle = (title: string) => {
    setSelectedTitle(title);
    setModalOpen(false);
  }

  useEffect(() => {
    const getCompletedProjectList = async () => {
      try {
        const { data } = await getCompletedProject();
        setCount(data.listLength);
        setProjects(data.completedProjects);
      } catch (error) {
        console.error(error);
      }
    }

    getCompletedProjectList();
  }, []);

  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div className={styles.container}>
        <div className={styles.countText}>모집 완료한 게시글이 <span className={styles.count}>{count}</span>개 있네요!</div>
        {count > 0 && <div className={styles.desc}>작성하고 싶은 게시글 제목을 클릭해주세요</div>}
        {count > 0 && projects &&
          <div className={styles.titleContainer}>
            <div className={styles.titleList}>
              {projects.map((project, id) => {
                const title = project.project_title;
                return (
                  <div
                    className={styles.title}
                    key={`${title}-${id}`}
                    onClick={() => handleClickTitle(title)}
                  >
                    {project.project_id}. {title}
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    </ModalFullScreen>
  )
}

export default CompleteListModal;