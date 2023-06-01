import React from 'react';

// 타입
import { TypeProjectBody } from '../../interfaces/Project.interface';
// 스타일 관련
import { RoleIcon, StackIcon, TargetIcon, ClockIcon } from './ProjectBodyLogo';
import styles from './ProjectBody.module.scss';
// 상수
import {
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_ROLES,
} from '../../constants/project';

export default function ProjectBody({ bodyData }: { bodyData: TypeProjectBody | null }) {
  if (bodyData) {
    return (
      <div className={styles.container}>
        {/* 요약 */}
        <div>
          <div className={styles.paragraphTitle}>요약</div>
          <div className={styles.paragraph}>{bodyData.project_summary}</div>
        </div>

        {/* 모집 역할 */}
        <div>
          <div className={styles.paragraphTitle}>모집 역할</div>
          <div className={styles.logoLine}>
            {bodyData.project_recruitment_roles.roleList.map((role) => {
              return (
                <div className={styles.logoBlock}>
                  <div className={styles.logoCircle}>
                    <RoleIcon role={PROJECT_RECRUITMENT_ROLES[role]} />
                  </div>
                  <p className={styles.logoText}>{PROJECT_RECRUITMENT_ROLES[role]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 필수 기술 스택 */}
        <div>
          <div className={styles.paragraphTitle}>필수 기술 스택</div>
          <div className={styles.logoLine}>
            {bodyData.project_required_stacks.stackList.map((stack) => {
              return (
                <div className={styles.logoBlock}>
                  <div className={styles.logoCircle}>
                    <StackIcon stack={stack} />
                  </div>
                  <p className={styles.logoText}>{stack}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 목적 */}
        <div>
          <div className={styles.paragraphTitle}>목적</div>
          <div className={styles.logoLine}>
            <div className={styles.logoCircle}>
              <TargetIcon />
            </div>
            <p className={styles.logoText}>{PROJECT_GOAL[bodyData.project_goal]}</p>
          </div>
        </div>

        {/* 참여 시간 */}
        <div>
          <div className={styles.paragraphTitle}>참여 시간</div>
          <div className={styles.logoLine}>
            <div className={styles.logoCircle}>
              <ClockIcon />
            </div>
            <p className={styles.logoText}>
              {PROJECT_PARTICIPATION_TIME[bodyData.project_participation_time]}
            </p>
          </div>
        </div>

        {/* 소개 */}
        <div>
          <div className={styles.paragraphTitle}>소개</div>
          <div className={styles.paragraph}>{bodyData.project_introduction}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
