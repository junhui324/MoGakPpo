import React, { useState, useEffect } from 'react';

export default function ProjectTitle({ projectId }: { projectId: string }) {
  const [studyData, setStudyData] = useState(null);

  useEffect(() => {
    // 프로젝트 데이터 로딩
    fetch('../../mock/data.json')
      .then((response) => response.json())
      .then(setStudyData);
  }, []);

  if (!studyData) {
  }
  return (
    <div>
      {/* 카테고리 구분*/}
      <div>
        <div>{'카테고리'}</div>
      </div>
      {/* 메인 타이틀 */}
      <div>
        <div>{'상태'}</div>
        <h2>{'타이틀'}</h2>
        <div>{'신규 여부'}</div>
      </div>
      {/* 프로젝트 정보 */}
      <div>
        <div>{'날짜'}</div>
        <div>{'조회수'}</div>
        <div>{'댓글수'}</div>
      </div>
    </div>
  );
}
