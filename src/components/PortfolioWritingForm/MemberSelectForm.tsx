import { TypeTeamProjectUser } from '../../interfaces/User.interface';
import { getUsersByEmail } from '../../apis/Fetcher';
import { useRef, useState } from 'react';
import styles from './MemberSelectForm.module.scss';
import UserProfileList from '../common/User/UserProfileList';
import LengthCheck from '../ProjectWritingForm/LengthCheck';
import { MAX_MEMBERS_LENGTH } from './PortfolioWritingForm';

interface MemberSelectFormProps {
  selectedUserList: TypeTeamProjectUser[];
  onMemberSelect: (userData: TypeTeamProjectUser) => void;
  onMemberUnselect: (userId: number) => void;
}

function MemberSelectForm({
  selectedUserList,
  onMemberSelect,
  onMemberUnselect,
}: MemberSelectFormProps) {
  const [userList, setUserList] = useState<TypeTeamProjectUser[]>([]);
  const [showSelectBox, setShowSelectBox] = useState(false);

  const inputTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchInputChange = (value: string) => {
    if (value.length > 0) {
      getUsersBySearchTerm(value);
      setShowSelectBox(true);
      return;
    }
    setShowSelectBox(false);
  };

  const getUsersBySearchTerm = async (searchTerm: string) => {
    const userListData = await getUsersByEmail(searchTerm);
    setUserList(userListData.data);
  };

  return (
    <div className={styles.container}>
      <h4>프로젝트에 참여한 멤버를 선택해 주세요</h4>
      <div className={styles.secondContainer}>
        <div className={styles.searchUserListContainer}>
          <input
            type="text"
            placeholder="이메일로 검색해 주세요."
            onChange={(e) => {
              clearTimeout(inputTimerRef.current!);
              inputTimerRef.current = setTimeout(() => {
                handleSearchInputChange(e.target.value);
              }, 500);
            }}
          />
          {showSelectBox && (
            <ul>
              {userList.map((userData) => (
                <UserProfileList
                  key={userData.user_id}
                  userData={userData}
                  onUserClick={onMemberSelect}
                />
              ))}
            </ul>
          )}
        </div>
        <div className={styles.selectedUsersContainer}>
          <div className={styles.topContainer}>
            <h4>선택 한 멤버</h4>
            <LengthCheck
              valueLength={selectedUserList ? selectedUserList.length : 0}
              maxLength={MAX_MEMBERS_LENGTH}
            />
          </div>
          {selectedUserList && (
            <ul>
              {selectedUserList.map((userData) => (
                <UserProfileList
                  key={userData.user_id}
                  userData={userData}
                  onUserUnselect={onMemberUnselect}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberSelectForm;
