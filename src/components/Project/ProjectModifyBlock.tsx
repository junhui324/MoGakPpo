import React from 'react';

import { TypeProjectModify } from '../../interfaces/Project.interface';

export default function ProjectModifyBlock({
  modifyData,
}: {
  modifyData: TypeProjectModify | null;
}) {
  return (
    <div>
      <div>
        <div>{'모집 설정 버튼'}</div>
      </div>
      <div>
        <div>{'수정 버튼'}</div>
        <div>{'삭제 버튼'}</div>
      </div>
    </div>
  );
}
