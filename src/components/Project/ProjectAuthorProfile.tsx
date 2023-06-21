import { useNavigate } from 'react-router-dom';

// 타입
import { TypeProjectAuthor } from '../../interfaces/Project.interface';

// 스타일
import styles from './ProjectAuthorProfile.module.scss';

// 이미지
import DefaultUserImage from '../../assets/DefaultUser.png';
import ROUTES from '../../constants/Routes';

import { useRecoilState } from 'recoil';
import { loginAtom } from '../../recoil/loginState';

export default function ProjectAuthorProfile({
  authorData,
}: {
  authorData: TypeProjectAuthor | null;
}) {
  const navigate = useNavigate();
  // 로컬 스토리지에 있는 user 정보 가져오기
  const LoginData = useRecoilState(loginAtom);
  const userId = LoginData[0];

  if (!authorData) return <></>;

  // 글 작성자가 현재 작성자인지 확인하는 함수
  const isAuthor = (): boolean => {
    // 전역적인 userId와 user_id아이디가 같으면 true를 호출합니다.
    return Number(userId.user_id) === authorData?.user_id ? true : false;
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        isAuthor()
          ? navigate(`${ROUTES.MY_PAGE}`)
          : navigate(`${ROUTES.USER_PAGE}${authorData.user_id}`);
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
