import React from 'react';

import { TypeProjectModify } from '../../interfaces/Project.interface';

// 스타일
import styles from './ProjectModifyBlock.module.scss';
// 상수
import { PROJECT_RECRUITMENT_STATUS } from '../constant/project';

function RecruitmentCompleteButton({
  recruitmentStatus,
  className,
}: {
  recruitmentStatus: string;
  className: string;
}) {
  return recruitmentStatus === '모집 중' ? (
    <button className={className}>모집 완료 하기</button>
  ) : recruitmentStatus === '모집 완료' ? (
    <button disabled={true} className={className}>
      모집 완료
    </button>
  ) : (
    <button disabled={true} className={className}>
      ERROR
    </button>
  );
}

function ModifyButton({ recruitmentStatus }: { recruitmentStatus: string }) {
  return recruitmentStatus === '모집 중' ? (
    <button>수정</button>
  ) : recruitmentStatus === '모집 완료' ? (
    <button disabled={true}>수정</button>
  ) : (
    <button disabled={true}>ERROR</button>
  );
}

export default function ProjectModifyBlock({
  modifyData,
}: {
  modifyData: TypeProjectModify | null;
}) {
  if (modifyData) {
    const recruitmentStatus = PROJECT_RECRUITMENT_STATUS[modifyData.project_recruitment_status];

    return (
      <div className={styles.container}>
        <RecruitmentCompleteButton
          className={styles.recruitmentButton}
          recruitmentStatus={recruitmentStatus}
        />
        <div>
          <ModifyButton recruitmentStatus={recruitmentStatus} />
          <button>삭제</button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
