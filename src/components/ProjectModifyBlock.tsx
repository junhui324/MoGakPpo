import React from 'react';

export default function ProjectModifyBlock({ projectId }: { projectId: string }) {
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
