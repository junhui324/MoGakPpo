import React from 'react';
import { useNavigate } from 'react-router-dom';

// 타입
import { TypeProjectAuthor } from '../../interfaces/Project.interface';

// 스타일
import styles from './ProjectAuthorProfile.module.scss';

// 이미지
import DefaultUserImage from '../../assets/DefaultUser.png';
import ROUTES from '../../constants/Routes';

export default function ProjectAuthorProfile({
  authorData,
}: {
  authorData: TypeProjectAuthor | null;
}) {
  const navigate = useNavigate();

  if (!authorData) return <></>;

  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`${ROUTES.USER_PAGE}${authorData.user_id}`);
      }}
    >
      <div className={styles.imageBox}>
        <img
          className={styles.image}
          src={authorData.user_img ?? DefaultUserImage}
          alt={`${authorData.user_name}의 사용자 이미지`}
        />
      </div>
      <div className={styles.authorBox}>
        <p className={styles.authorName}>{authorData.user_name}</p>
        <p className={styles.authorIntroduction}>{authorData.user_introduction}</p>
      </div>
    </div>
  );
}
