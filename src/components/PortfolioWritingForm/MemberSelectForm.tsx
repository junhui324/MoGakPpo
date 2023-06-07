import { TypeTeamProjectUser } from '../../interfaces/User.interface';
import { getUsersByEmail } from '../../apis/Fetcher';
import { useEffect, useState } from 'react';
import styles from './MemberSelectForm.module.scss';

interface MemberSelectFormProps {
  onMemberIdsSelect: (userId: number) => void;
  onMemberIdsUnselect: (userId: number) => void;
}
function MemberSelectForm({ onMemberIdsSelect, onMemberIdsUnselect }: MemberSelectFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState<TypeTeamProjectUser[]>([]);
  const [showSelectBox, setShowSelectBox] = useState(false);
  const [selectedUserList, setSelectedUserList] = useState<TypeTeamProjectUser[]>([]);

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const getUsersBySearchTerm = async () => {
    const userListData = await getUsersByEmail(searchTerm);
    setUserList(userListData.data);
  };

  const handleUserClick = (userData: TypeTeamProjectUser): void => {
    if (!selectedUserList.some((user) => user.user_id === userData.user_id)) {
      setSelectedUserList((current) => [...current, userData]);
      onMemberIdsSelect(userData.user_id);
    }
  };

  const handleUserUnselect = (userId: number) => {
    setSelectedUserList((prev) => prev.filter((user) => user.user_id !== userId));
    onMemberIdsUnselect(userId);
  };

  useEffect(() => {
    console.log(selectedUserList);
  }, [selectedUserList]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setShowSelectBox(true);
      getUsersBySearchTerm();
    }
    searchTerm.length === 0 && setShowSelectBox(false);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <h3>프로젝트에 참여한 멤버를 선택해 주세요</h3>
      <div>
        {selectedUserList && (
          <ul className={styles.selectedUsersContainer}>
            {selectedUserList.map((user) => {
              return (
                <li key={user.user_id}>
                  {user.user_name}
                  <button onClick={() => handleUserUnselect(user.user_id)}>X</button>
                </li>
              );
            })}
          </ul>
        )}
        <input
          type="text"
          placeholder="이메일로 검색해 주세요."
          value={searchTerm}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
      </div>
      {showSelectBox && (
        <ul className={styles.searchUserListContainer}>
          {userList.map((userData) => {
            const {
              user_id: id,
              user_email: email,
              user_name: name,
              user_img: img,
              user_career_goal: goal,
            } = userData;
            return (
              <li key={id} onClick={() => handleUserClick(userData)}>
                <img src={img} alt={`${name} 프로필`} />
                <div>
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{goal}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MemberSelectForm;
