import React, { useState } from 'react';
import * as Fetcher from '../../apis/Fetcher';
import { useNavigate } from 'react-router-dom';

// 컴포넌트
import ModalFullScreen from '../common/Modal/ModalFullScreen';
// 타입
import { TypeProjectModify, TypeProject } from '../../interfaces/Project.interface';
import { AxiosResponse } from 'axios';
// 스타일
import styles from './ProjectModifyBlock.module.scss';
// 상수
import { PROJECT_RECRUITMENT_STATUS } from '../../constants/project';
import ROUTES from '../../constants/Routes';

// 문자열 상수
const RECRUITING = '모집 중';
const COMPLETE = '모집 완료';

const CompleteModal = ({ onClick }: { onClick: (isOk: boolean) => void }) => {
  return (
    <ModalFullScreen setModalOpen={() => true} closeButton={false}>
      <div className={styles.modalContainer}>
        <p className={styles.modalText}>모집 완료하실 건가요?</p>
        <p className={styles.modalWarningText}>*모집 완료 시 수정이 불가능합니다.</p>
        <div className={styles.modalButtonBox}>
          <button className={styles.completeButton} onClick={() => onClick(true)}>
            완료
          </button>
          <button className={styles.cancleButton} onClick={() => onClick(false)}>
            취소
          </button>
        </div>
      </div>
    </ModalFullScreen>
  );
};

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
    <button disabled={true} className={styles.showOffButton}>
      프로젝트 자랑 하러 가기
    </button>
  ) : (
    <button disabled={true} className={styles.completeButton}>
      ERROR
    </button>
  );
}

interface ModifyButtonType {
  recruitmentStatus: string;
  onModifyClick: () => void;
  onDeleteClick: () => void;
}

function ModifyAndDeleteButton({
  recruitmentStatus,
  onModifyClick,
  onDeleteClick,
}: ModifyButtonType) {
  return recruitmentStatus === RECRUITING ? (
    <>
      <button className={styles.modifyButton} onClick={onModifyClick}>
        수정
      </button>
      <button className={styles.deleteButton} onClick={onDeleteClick}>
        삭제
      </button>
    </>
  ) : recruitmentStatus === COMPLETE ? (
    <button className={styles.deleteButtonComplete} onClick={onDeleteClick}>
      삭제
    </button>
  ) : (
    <button disabled={true} className={styles.errorButton}>
      ERROR
    </button>
  );
}

export default function ProjectModifyBlock({
  modifyData,
  fetchData,
}: {
  modifyData: TypeProjectModify | null;
  fetchData: () => void;
}) {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const recruitmentComplete = async () => {
    if (modifyData) {
      try {
        const response: AxiosResponse = await Fetcher.patchProjectStatus(modifyData.project_id);

        // 성공 응답으로 보낸 project_id와 현재 컴포넌트의 project_id가 같으면 성공 처리 합니다.
        if (response.data.project_id === modifyData.project_id) {
          // fetchData()로 최신화 된 프로젝트 정보를 불러옵니다.
          fetchData();
        } else throw new Error('예기치 않은 서버 응답');
      } catch (error) {
        alert(`${error} : 모집 완료 처리에 실패했습니다.`);
      }
    }
  };

  const deleteProject = async () => {
    if (modifyData) {
      try {
        await Fetcher.deleteProject(modifyData.project_id);

        // 오류를 반환받지 않으면 진행합니다.
        alert('게시글이 삭제되었습니다.');
        navigate(ROUTES.PROJECT_LIST);
      } catch (error) {
        alert(`${error} : 삭제 처리에 실패했습니다.`);
      }
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
      deleteProject();
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleModifyClick = () => {
    navigate(`/modify`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  if (!modifyData) return <></>;

  const recruitmentStatus = PROJECT_RECRUITMENT_STATUS[modifyData.project_recruitment_status];

  return (
    <>
      <div className={styles.container}>
        <RecruitmentCompleteButton
          recruitmentStatus={recruitmentStatus}
          onClick={() => setIsCompleteModalOpen(true)}
        />
        <div className={styles.modifyContainer}>
          <ModifyAndDeleteButton
            recruitmentStatus={recruitmentStatus}
            onModifyClick={() => handleModifyClick()}
            onDeleteClick={() => handleDeleteClick()}
          />
        </div>
      </div>
      {isCompleteModalOpen ? <CompleteModal onClick={handleModalComplete} /> : ''}
      {isDeleteModalOpen ? <DeleteModal onClick={handleModalDelete} /> : ''}
    </>
  );
}
