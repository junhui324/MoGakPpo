import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import { TypeUserProfile } from '../../interfaces/User.interface';
import { getUserProfileById } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import DefaultUserImg from '../../assets/DefaultUser.png';

function Profile() {
  const [user, setUser] = useState<TypeUserProfile>();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const { message, data } = await getUserProfileById(38);
      //console.log(message, data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={user?.user_img || DefaultUserImg}
          alt={user?.user_name}
        ></img>
      </div>
      <div className={styles.introWrapper}>
        <div className={styles.name}>{user?.user_name}</div>
        <div className={styles.intro}>{user?.user_introduction}</div>
        <div className={styles.career}>{user?.user_career_goal}</div>
        <div className={styles.stacks}>
          {user?.user_stacks.stackList.map((stack, index) => {
            return (
              <div className={styles.stack} key={`${stack}-${index}`}>
                {stack}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
