import React, { useState, useEffect } from 'react';
import { TypeProjectTitle } from '../../interfaces/Project.interface';
import { getIsNew } from '../../utils/getIsNew';

//스타일
import styles from './ProjectTitle.module.scss';

// 상수
import { PROJECT_TYPE, PROJECT_RECRUITMENT_STATUS } from '../../constants/project';
import ShareButton from '../common/Share/ShareButton';
import { useLocation } from 'react-router-dom';

// 날짜 계산 상수
const ONE_DAY_TIME = 24 * 60 * 60 * 1000;
const ONE_HOUR_TIME = 60 * 60 * 1000;
const ONE_MINUTE_TIME = 60 * 1000;
const TODAY = 0;
const ONE_DAY = 1;
const WEEK_DAY = 7;
const MONTH_ADJUSTMENT = 1;

// 문자열 상수
const RECRUITING = '모집 중';
const COMPLETE = '모집 완료';

export default function ProjectTitle({ titleData }: { titleData: TypeProjectTitle | null }) {
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  if (!titleData) return <></>;

  const timestamp = new Date(titleData.project_created_at);
  const localDate = new Date(timestamp.getTime());
  // 게시글 생성 시간에 대한 정리를 합니다.
  const now: Date = new Date();

  // 기타 값
  const recruitmentStatus = PROJECT_RECRUITMENT_STATUS[titleData.project_recruitment_status];
  const commentsCount: number = titleData.project_comments_count;

  // 7일전까지는 글로 나타내고, 그 이후엔 날짜를 반환합니다.
  const projectDate = () => {
    // 지금과 같은 날인지 확인합니다.
    if (now.getDate() === localDate.getDate()) {
      // 지금과 같은 시간인지 확인합니다.
      if (now.getHours() === localDate.getHours()) {
        // 지금과 같은 분인지 확인합니다.
        if (now.getMinutes() === localDate.getMinutes()) {
          return '방금 전';
        } else {
          return `${now.getMinutes() - localDate.getMinutes()}분 전`;
        }
      } else {
        return `${now.getHours() - localDate.getHours()}시간 전`;
      }
    } else if (now.getDate() - localDate.getDate() === ONE_DAY) return '하루 전';
    else if (now.getDate() - localDate.getDate() <= WEEK_DAY)
      return `${now.getDate() - localDate.getDate()}일 전`;
    else
      return `${localDate.getFullYear()}년 ${
        localDate.getMonth() + MONTH_ADJUSTMENT
      }월 ${localDate.getDate()}일`;
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
        <span>
          {currentLocation === 'preview' ? `${year}년 ${month}월 ${date}일` : projectDate()}
        </span>
        <span> · </span>
        <span>조회수 {titleData.project_views_count}</span>
        <span> · </span>
        <span>댓글수 {commentsCount}</span>
        {/* 공유 버튼 */}
        {currentLocation === 'preview' ? <></> : <ShareButton title={titleData.project_title} />}
      </div>
    </div>
  );
}
