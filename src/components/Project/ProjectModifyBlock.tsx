import React, { useState, useEffect } from 'react';

// 컴포넌트
import ModalBasic from '../common/Modal/ModalBasic';
// 타입
import { TypeProjectModify, TypeProject } from '../../interfaces/Project.interface';
// 스타일
import styles from './ProjectModifyBlock.module.scss';
// 상수
import { PROJECT_RECRUITMENT_STATUS } from '../../constants/project';
// 문자열 상수
const RECRUITING = '모집 중';
const COMPLETE = '모집 완료';

interface PostTypeSelectModalProps {
  setModalOpen: (value: boolean) => void;
}

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

function ModifyButton({ recruitmentStatus }: { recruitmentStatus: string }) {
  return recruitmentStatus === RECRUITING ? (
    <button className={styles.modifyButton}>수정</button>
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
  setProjectData,
}: {
  modifyData: TypeProjectModify | null;
  setProjectData: React.Dispatch<React.SetStateAction<TypeProject | null>>;
}) {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const recruitmentComplete = () => {
    try {
      // API 연결을 통해 모집완료 처리가 제대로 되었는지 확인합니다.(상태코드 200)

      // setProjectData를 통해 모집 상태를 최신화시킨 후 렌더링합니다.
      setProjectData((prevProjectData) => {
        if (prevProjectData) return { ...prevProjectData, project_recruitment_status: 'COMPLETE' };
        return null;
      });
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
            <ModifyButton recruitmentStatus={recruitmentStatus} />
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
