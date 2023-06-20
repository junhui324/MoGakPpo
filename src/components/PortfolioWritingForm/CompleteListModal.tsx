import { useState } from 'react';
import styles from './CompleteListModal.module.scss';
import ModalFullScreen from '../common/Modal/ModalFullScreen';
import { useSetRecoilState } from 'recoil';
import { selectedPostTitleState } from '../../recoil/portfolioState';

interface CompleteListModalProps {
  setModalOpen: (value: boolean) => void;
}

function CompleteListModal({ setModalOpen }: CompleteListModalProps) {
  const tempList = ['제목길다제목길다제목길다제목길다제목길다제목길다제목길다제목길다제목길다제목길다제목길다', '모집완료 리스트 2', '모집완료 리스트 3'];
  const [count, setCount] = useState(tempList.length);
  const setSelectedTitle = useSetRecoilState(selectedPostTitleState);

  const handleClickTitle = (title: string) => {
    setSelectedTitle(title);
    setModalOpen(false);
  }

  return (
    <ModalFullScreen setModalOpen={setModalOpen} closeButton={false}>
      <div className={styles.container}>
        <div className={styles.countText}>모집 완료한 게시글이 <span className={styles.count}>{count}</span>개 있네요!</div>
        {count > 0 && <div className={styles.desc}>작성하고 싶은 게시글 제목을 클릭해주세요</div>}
        {count > 0 &&
          <div className={styles.titleContainer}>
            {tempList.map((title, id) => {
              return (
                <div 
                  className={styles.title}
                  key={`${title}-${id}`}
                  onClick={() => handleClickTitle(title)}
                >
                  {title}
                </div>
              )
            })}
          </div>
        }
      </div>
    </ModalFullScreen>
  )
}

export default CompleteListModal;