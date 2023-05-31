import React from 'react';

import { TypeProjectBookmarks } from '../../interfaces/Project.interface';

import { CgBookmark } from 'react-icons/cg';

export default function ProjectBookmarkBlock({
  bookmarksData,
}: {
  bookmarksData: TypeProjectBookmarks | null;
}) {
  if (bookmarksData) {
    const bookmarksCount = bookmarksData.project_bookmarks.bookmarkList.length;

    return (
      <div>
        <button>
          <CgBookmark />
          <p>북마크</p>
        </button>
        <div>
          <p>{bookmarksCount}명이 북마크했습니다.</p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
