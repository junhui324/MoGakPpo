import React from 'react';

export default function ProjectBookmarkBlock({ projectId }: { projectId: string }) {
  return (
    <div>
      <div>{'북마크 버튼'}</div>
      <div>{'몇 명이 북마크 했는지'}</div>
    </div>
  );
}
