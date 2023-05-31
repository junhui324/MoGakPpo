import React from 'react';

import { TypeProjectModify } from '../../interfaces/Project.interface';

function RecruitmentFinishButton({ recruitmentStatus }: { recruitmentStatus: string }) {
  return recruitmentStatus === '모집 중' ? (
    <button>모집 완료 하기</button>
  ) : recruitmentStatus === '모집 완료' ? (
    <button disabled={true}>모집 완료</button>
  ) : (
    <button disabled={true}>ERROR</button>
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
    const recruitmentStatus = modifyData.project_recruitment_status;

    return (
      <div>
        <div>
          <div>
            <RecruitmentFinishButton recruitmentStatus={recruitmentStatus} />
          </div>
        </div>
        <div>
          <div>
            <ModifyButton recruitmentStatus={recruitmentStatus} />
          </div>
          <div>
            <button>삭제</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
