import { getUsersByEmail } from '../../apis/Fetcher';
import { useState } from 'react';

function MemberSelectForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  //유저 검색 api 호출

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  // const getUsersBySearchTerm = async () => {
  //   const userListData = await getUsersByEmail(searchTerm);
  //   setUserList(userListData.data);
  // };

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
