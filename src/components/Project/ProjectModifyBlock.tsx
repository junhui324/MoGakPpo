import React, { useState } from 'react';

// 컴포넌트
import ModalBasic from '../common/Modal/ModalBasic';
// 타입
import { TypeProjectModify, TypeProject } from '../../interfaces/Project.interface';
// 스타일
import styles from './ProjectModifyBlock.module.scss';
// 상수
import { PROJECT_RECRUITMENT_STATUS } from '../../constants/project';

import { useNavigate } from 'react-router-dom';

// 문자열 상수
const RECRUITING = '모집 중';
const COMPLETE = '모집 완료';

const CompleteModal = ({ onClick }: { onClick: (isOk: boolean) => void }) => {
  return (
    <ModalBasic setModalOpen={() => true} closeButton={false} fullScreen={true}>
      <div className={styles.modalContainer}>
        <p className={styles.modalText}>모집 완료하실 건가요?</p>
        <div className={styles.modalButtonBox}>
          <button className={styles.completeButton} onClick={() => onClick(true)}>
            완료
          </button>
          <button className={styles.cancleButton} onClick={() => onClick(false)}>
            취소
          </button>
        </div>
      </div>
    </ModalBasic>
  );
};

const DeleteModal = ({ onClick }: { onClick: (isOk: boolean) => void }) => {
  return (
    <ModalBasic setModalOpen={() => true} closeButton={false} fullScreen={true}>
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
    </ModalBasic>
  );
};

function RecruitmentCompleteButton({
  recruitmentStatus,
  onClick,
}: {
  recruitmentStatus: string;
  onClick: () => void;
}) {
  return recruitmentStatus === RECRUITING ? (
    <button className={styles.recruitingButton} onClick={onClick}>
      모집 완료 하기
    </button>
  ) : recruitmentStatus === COMPLETE ? (
    <button disabled={true} className={styles.completeButton}>
      모집 완료
    </button>
  ) : (
    <button disabled={true} className={styles.completeButton}>
      ERROR
    </button>
  );
}

interface ModifyButtonType {
  recruitmentStatus: string;
  onClick: () => void;
}

function ModifyButton({ recruitmentStatus, onClick }: ModifyButtonType) {
  return recruitmentStatus === RECRUITING ? (
    <button className={styles.modifyButton} onClick={onClick}>
      수정
    </button>
  ) : recruitmentStatus === COMPLETE ? (
    <button disabled={true} className={styles.modifyDisableButton}>
      수정
    </button>
  ) : (
    <button disabled={true} className={styles.modifyDisableButton}>
      ERROR
    </button>
  );
}

export default function ProjectModifyBlock({
  modifyData,
  fetchData,
}: {
  modifyData: TypeProjectModify | null;
  fetchData: () => Promise<void>;
}) {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const recruitmentComplete = () => {
    try {
      // API 연결을 통해 모집완료 처리가 제대로 되었는지 확인합니다.(상태코드 200)
      /*
      const response : AxiosResponse<T>  = await Fetcher.deleteProject();
      const status = response.status;
      if(status === 200) {
        밑 코드를 이쪽으로 이동
      } else throw new Error('예기치 않은 서버 응답');
      */

      // fetchData()로 최신화 된 프로젝트 정보를 불러옵니다.
      fetchData();
    } catch (error) {
      alert('모집 완료 처리에 실패했습니다.');
    }
  };

  const handleModalComplete = (isOk: boolean) => {
    if (isOk) {
      setIsCompleteModalOpen(false);
      recruitmentComplete();
    } else {
      setIsCompleteModalOpen(false);
    }
  };

  const handleModalDelete = (isOk: boolean) => {
    if (isOk) {
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleModifyClick = () => {
    navigate(`/modify`);
  };

  if (modifyData) {
    const recruitmentStatus = PROJECT_RECRUITMENT_STATUS[modifyData.project_recruitment_status];

    return (
      <>
        <div className={styles.container}>
          <RecruitmentCompleteButton
            recruitmentStatus={recruitmentStatus}
            onClick={() => setIsCompleteModalOpen(true)}
          />
          <div className={styles.modifyContainer}>
            <ModifyButton
              recruitmentStatus={recruitmentStatus}
              onClick={() => handleModifyClick()}
            />
            <button className={styles.deleteButton} onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </button>
          </div>
        </div>
        {isCompleteModalOpen ? <CompleteModal onClick={handleModalComplete} /> : ''}
        {isDeleteModalOpen ? <DeleteModal onClick={handleModalDelete} /> : ''}
      </>
    );
  } else {
    return <></>;
  }
}
