import React from 'react';

import { TypeProjectBody } from '../../interfaces/Project.interface';

export default function ProjectBody({ bodyData }: { bodyData: TypeProjectBody | null }) {
  return (
    <div>
      <h3>요약</h3>
      <div>{'요약 내용'}</div>
      <h3>모집역할</h3>
      <div>{'maplist 모집 역할 로고'}</div>
      <h3>필수 기술 스택</h3>
      <div>{'maplist 필수 스택 로고'}</div>
      <h3>목적</h3>
      <div>{'로고 + 목적'}</div>
      <h3>참여 시간</h3>
      <div>{'로고 + 시간'}</div>
      <h3>소개</h3>
      <div>{'소개 내용'}</div>
    </div>
  );
}
