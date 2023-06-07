import { TypeTeamProjectUser } from '../../interfaces/User.interface';
import { getUsersByEmail } from '../../apis/Fetcher';
import { useEffect, useState } from 'react';

function MemberSelectForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState<TypeTeamProjectUser[]>([]);
  const [showSelectBox, setShowSelectBox] = useState();

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const getUsersBySearchTerm = async () => {
    const userListData = await getUsersByEmail(searchTerm);
    setUserList(userListData.data);
  };

  useEffect(() => {
    console.log(userList);
    getUsersBySearchTerm();
  }, [searchTerm]);

  return (
    <div>
      <label>
        프로젝트에 참여한 멤버를 선택해 주세요.{' '}
        <input
          type="text"
          placeholder="이메일로 검색해 주세요."
          value={searchTerm}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
      </label>
      <ul>
        {userList.map((userData) => {
          const {
            user_id: id,
            user_email: email,
            user_name: name,
            user_img: img,
            user_career_goal: goal,
          } = userData;
          return (
            <li key={id}>
              <p>{email}</p>
              <p>{name}</p>
              <p>{goal}</p>
              <img src={img} alt={`${name} 프로필`} />
            </li>
          );
        })}
        {/* <li key={id}>
          <p>{email}</p>
          <p>{name}</p>
          <p>{career_goal}</p>
          <img src={img} />
        </li>
        <li>유저1</li>
        <li>유저1</li> */}
      </ul>
    </div>
  );
}

export default MemberSelectForm;
