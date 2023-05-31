import React from 'react';

import { TypeProjectBookmarks } from '../../interfaces/Project.interface';

export default function ProjectBookmarkBlock({
  bookmarksData,
}: {
  bookmarksData: TypeProjectBookmarks | null;
}) {
  return (
    <div>
      <div>{'북마크 버튼'}</div>
      <div>{'몇 명이 북마크 했는지'}</div>
    </div>
  );
}
