import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import { getUserProfile } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import { FcBriefcase, FcSupport } from "react-icons/fc";
import { useRecoilState } from 'recoil';
import { loginAtom } from '../../recoil/loginState';

interface ProfileProps {
  onError: (errorMessage: string) => void;
}

function Profile({ onError }: ProfileProps) {
  const [loginUser, setLoginUser] = useRecoilState(loginAtom);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    try {
      const { data } = await getUserProfile();

      setLoginUser((prev) => {
        return {
          ...prev,
          user_name: data.user_name,
          user_img: data.user_img,
          user_career_goal: data.user_career_goal,
          user_stacks: data.user_stacks,
          user_introduction:data.user_introduction,
        }
      });
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
          default:
            onError('알 수 없는 오류가 발생했습니다.');
            break;
        }
      }
    }
  }, [onError, setLoginUser]);

  const handleClickEdit = () => {
    navigate(`${ROUTES.USER_UPDATE}`);
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className={styles.profileContainer}> 
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={loginUser.user_img} alt={loginUser.user_name}></img>
        <button className={styles.updateButton} onClick={handleClickEdit}>
          편집
        </button>
      </div>
      <div className={styles.introWrapper}>
        <div className={styles.name}>{loginUser.user_name}</div>
        <div className={styles.intro}>{loginUser.user_introduction}</div>
        <div className={styles.career}>
          <FcBriefcase/>
          {loginUser.user_career_goal 
          ? loginUser.user_career_goal 
          : <div className={styles.emptyCareer}>{loginUser.user_name}님의 목표 직군이 비어있어요</div>}
        </div>
        <div className={styles.stacks}>
          <FcSupport />
          {loginUser.user_stacks?.stackList && loginUser.user_stacks?.stackList?.length > 0 
          ? loginUser.user_stacks?.stackList?.map((stack, index) => {
            return (
              <div className={styles.stack} key={`${stack}-${index}`}>
                {stack}
              </div>
            );
          }) : <div className={styles.emptyStack}>{loginUser.user_name}님의 기술 스택이 비어있어요</div>}
      </div>
      </div>
    </div>
  );
}

export default Profile;