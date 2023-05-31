import React from 'react';

import { TypeProjectAuthor } from '../../interfaces/Project.interface';

export default function ProjectAuthorProfile({
  authorData,
}: {
  authorData: TypeProjectAuthor | null;
}) {
  return (
    <div>
      <img src="https://example.com/" alt="사용자 프로필" />
      <div>{'사용자 닉네임'}</div>
      <div>{'사용자 소개'}</div>
    </div>
  );
}
