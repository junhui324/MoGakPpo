import React, { useState, useEffect } from 'react';
import { TypeProjectTitle } from '../../interfaces/Project.interface';
import { getIsNew } from '../../utils/getIsNew';

//스타일
import styles from './ProjectTitle.module.scss';

// 상수
import { PROJECT_TYPE, PROJECT_RECRUITMENT_STATUS } from '../../constants/project';
import ProjectShare from './ProjectShare';

// 날짜 계산 상수
const ONE_DAY_TIME = 24 * 60 * 60 * 1000;
const ONE_HOUR_TIME = 60 * 60 * 1000;
const ONE_MINUTE_TIME = 60 * 1000;
const TODAY = 0;
const ONE_DAY = 1;
const WEEK_DAY = 7;

// 문자열 상수
const RECRUITING = '모집 중';
const COMPLETE = '모집 완료';

export default function ProjectTitle({ titleData }: { titleData: TypeProjectTitle | null }) {
  if (titleData) {
    const timestamp: number = Date.parse(titleData?.project_created_at);
    // 게시글 생성 시간에 대한 정리를 합니다.
    const now: Date = new Date();
    const passedTime: number = now.getTime() - timestamp;
    const fewDaysAgo: number = Math.floor(passedTime / ONE_DAY_TIME);
    // 댓글 수
    const commentsCount: number = titleData.project_comments_count;
    // 모집 여부
    const recruitmentStatus = PROJECT_RECRUITMENT_STATUS[titleData.project_recruitment_status];

    // 7일전까지는 글로 나타내고, 그 이후엔 날짜를 반환합니다.
    const projectDate = () => {
      if (fewDaysAgo === TODAY) {
        // 시간을 계산합니다.
        const fewHoursAgo: number = Math.floor(passedTime / ONE_HOUR_TIME);
        // 분을 계산합니다
        if (fewHoursAgo < 1) {
          const fewMinuteAgo: number = Math.floor(passedTime / ONE_MINUTE_TIME);
          if (fewMinuteAgo < 1) {
            return '방금 전';
          } else {
            return `${fewMinuteAgo}분 전`;
          }
        } else {
          return `${fewHoursAgo}시간 전`;
        }
      } else if (fewDaysAgo === ONE_DAY) return '하루 전';
      else if (fewDaysAgo <= WEEK_DAY) return `${fewDaysAgo}일 전`;
      else return titleData.project_created_at.split(' ')[0];
    };

    return (
      <div className={styles.container}>
        {/* 카테고리 구분*/}
        <div>
          <span className={styles.category}>{PROJECT_TYPE[titleData.project_type]}</span>
        </div>
        {/* 메인 타이틀 */}
        <div>
          <span className={styles.status}>
            <span
              className={
                recruitmentStatus === RECRUITING
                  ? styles.statusRecruiting
                  : recruitmentStatus === COMPLETE
                  ? styles.statusDone
                  : 'ERROR'
              }
            >
              {recruitmentStatus}
            </span>
          </span>
          <span className={styles.after}> | </span>
          <span className={styles.title}>{titleData.project_title}</span>
          <span className={styles.new}>{getIsNew(titleData.project_created_at) ? 'NEW' : ''}</span>
        </div>
        {/* 프로젝트 정보 */}
        <div>
          <span>{projectDate()}</span>
          <span> · </span>
          <span>조회수 {titleData.project_views_count}</span>
          <span> · </span>
          <span>댓글수 {commentsCount}</span>
          {/* 공유 버튼 */}
          <ProjectShare projectTitle={titleData.project_title} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
