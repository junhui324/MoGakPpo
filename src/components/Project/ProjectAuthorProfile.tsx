import React from 'react';

import { TypeProjectAuthor } from '../../interfaces/Project.interface';

export default function ProjectAuthorProfile({
  authorData,
}: {
  authorData: TypeProjectAuthor | null;
}) {
  if (authorData) {
    return (
      <div>
        <div>
          <img src={authorData.author_img} alt="사용자 프로필" />
        </div>
        <div>
          <p>{authorData.author_name}</p>
        </div>
        <div>
          <p>{authorData.author_introduction}</p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
