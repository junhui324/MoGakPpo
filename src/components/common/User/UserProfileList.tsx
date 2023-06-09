import { TypeTeamProjectUser } from '../../../interfaces/User.interface';
import styles from './UserProfileList.module.scss';

interface UserListProps {
  userData: TypeTeamProjectUser;
  onUserClick?: (userData: TypeTeamProjectUser) => void;
  onUserUnselect?: (userId: number) => void;
}

export default function UserProfileList({ userData, onUserClick, onUserUnselect }: UserListProps) {
  const {
    user_id: id,
    user_email: email,
    user_name: name,
    user_img: img,
    user_career_goal: goal,
  } = userData;
  return (
    <li
      className={styles.userProfile}
      key={`user-${id}`}
      onClick={onUserClick ? () => onUserClick(userData) : undefined}
    >
      <img src={img} alt={`${name} 프로필`} />
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{goal}</p>
      </div>
      {onUserUnselect && (
        <button className={styles.unselectButton} onClick={() => onUserUnselect(id)}>
          X
        </button>
      )}
    </li>
  );
}
