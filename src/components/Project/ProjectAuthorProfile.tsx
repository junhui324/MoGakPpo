import React from 'react';

// 타입
import { TypeProjectAuthor } from '../../interfaces/Project.interface';

// 스타일
import styles from './ProjectAuthorProfile.module.scss';

// 이미지
import DefaultUserImage from '../../assets/DefaultUser.png';

export default function ProjectAuthorProfile({
  authorData,
}: {
  authorData: TypeProjectAuthor | null;
}) {
  if (authorData) {
    return (
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <img
            className={styles.image}
            src={authorData.user_img ? authorData.user_img : DefaultUserImage}
            alt="사용자 프로필"
          />
        </div>
        <div className={styles.authorBox}>
          <p className={styles.authorName}>{authorData.user_name}</p>
          <p className={styles.authorIntroduction}>{authorData.user_introduction}</p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
