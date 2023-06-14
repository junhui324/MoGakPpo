import { useState } from 'react';
import * as Fetcher from '../../apis/Fetcher';
import { useNavigate } from 'react-router-dom';

// 컴포넌트
import ModalFullScreen from '../common/Modal/ModalFullScreen';

// 스타일
import styles from '../Project/ProjectModifyBlock.module.scss';

// 상수
import ROUTES from '../../constants/Routes';

interface TypePortfolioModify {
  portfolio_id: number;
  user_id: number;
}

interface ModifyButtonType {
  onClick: () => void;
}

const DeleteModal = ({ onClick }: { onClick: (isOk: boolean) => void }) => {
  return (
    <ModalFullScreen setModalOpen={() => true} closeButton={false}>
      <div className={styles.modalContainer}>
        <p className={styles.modalText}>삭제하실 건가요?</p>
        <div className={styles.modalButtonBox}>
          <button className={styles.deleteButton} onClick={() => onClick(true)}>
            삭제
          </button>
          <button className={styles.cancleButton} onClick={() => onClick(false)}>
            취소
          </button>
        </div>
      </div>
    </ModalFullScreen>
  );
};

const ModifyButton = ({ onClick }: ModifyButtonType) => {
  return (
    <button className={styles.modifyButton} onClick={onClick}>
      수정
    </button>
  );
};

export default function PortfolioModifyBlock({
  modifyData,
}: {
  modifyData: TypePortfolioModify | null;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deletePortfolio = async () => {
    if (modifyData) {
      try {
        await Fetcher.deletePortfolio(modifyData.portfolio_id);

        // 오류를 반환받지 않으면 진행합니다.
        alert('게시글이 삭제되었습니다.');
        navigate(ROUTES.PORTFOLIO_LIST);
      } catch (error) {
        alert(`${error} : 삭제 처리에 실패했습니다.`);
      }
    }
  };

  const handleModalDelete = (isOk: boolean) => {
    if (isOk) {
      setIsDeleteModalOpen(false);
      deletePortfolio();
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleModifyClick = () => {
    navigate(`/portfolios/modify/${modifyData?.portfolio_id}`);
  };

  if (!modifyData) return <></>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modifyContainer}>
          <ModifyButton onClick={() => handleModifyClick()} />
          <button className={styles.deleteButton} onClick={() => setIsDeleteModalOpen(true)}>
            삭제
          </button>
        </div>
      </div>
      {isDeleteModalOpen ? <DeleteModal onClick={handleModalDelete} /> : ''}
    </>
  );
}
