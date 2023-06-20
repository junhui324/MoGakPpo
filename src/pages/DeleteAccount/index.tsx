/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteAccount.module.scss';
import { css } from '@emotion/react';
import ROUTES from '../../constants/Routes';

import { useRecoilValue, useRecoilState } from 'recoil';
import { themeAtom } from '../../recoil/themeState';
import { loginAtom } from '../../recoil/loginState';

import { RiEye2Line, RiEyeCloseLine } from 'react-icons/ri';

function DeleteAccount() {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const darkMode = useRecoilValue(themeAtom);

  const LoginData = useRecoilState(loginAtom);
  const userId = LoginData[0];

  // 비밀번호 보여주기 / 안보여주기
  const inputType = showPassword ? 'text' : 'password';
  const autoComplete = showPassword ? 'off' : 'current-password';
  const eyeIcon = showPassword ? <RiEye2Line /> : <RiEyeCloseLine />;

  useEffect(() => {
    if (!userId.user_id) {
      alert('로그인이 필요합니다.');
      navigate(ROUTES.LOGIN);
    }
  }, []);

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReason = event.target.value;
    setReason(selectedReason);
    if (selectedReason === 'etc') {
      setOtherReason('');
    }
  };

  const handleOtherReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReason(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleDeleteAccount = async () => {
    try {
      const res = '';
      if (password.length === 0) {
        alert('비밀번호를 입력해주세요!');
        return;
      }
      alert('회원탈퇴가 완료되었습니다.');
      navigate(ROUTES.MAIN);
    } catch (error) {
      alert('비밀번호가 다릅니다.');
    }
  };

  // emotion 스타일링 정의
  const selectBoxStyles = css`
    width: 70%;
    padding: 8px;
    border: 1px solid ${darkMode ? '#343648' : '#e8e8e8'};
    border-radius: 4px;
    font-size: 14px;
    color: ${darkMode ? '#e8e8e8' : '#343648'};
    background-color: ${darkMode ? '#343648' : 'white'};

    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${darkMode ? '#d4a4f9' : '#e8e8e8'};
      box-shadow: 0 0 0 2px #d4a4f9;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  `;

  const optionStyles = css`
    color: ${darkMode ? '#d4a4f9' : '#6636da'};
    font-weight: bold;
    font-size: 15px;
    padding: 20px 0;

    cursor: pointer;
  `;

  const optionStyle = css`
    font-size: 15px;
    padding: 20px 0;

    cursor: pointer;
  `;

  return (
    <div className={styles.container}>
      <h2>회원탈퇴</h2>
      <div className={styles.introBox}>
        <p>고객님께서 회원 탈퇴를 원하신다니 저희 모프 서비스가 부족하고 미흡했나 봅니다.</p>
        <p>불편사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.</p>
        <p>아래 유의사항을 읽어보시고 회원 탈퇴를 진행해주세요.</p>
      </div>

      <h2 className={styles.sub}>📌 탈퇴 전 유의사항</h2>
      <div className={styles.notice}>
        <p>1. 탈퇴 시 계정의 모든 정보는 삭제되어 재가입 시에도 복구되지 않습니다.</p>
        <p>2. 해당 계정의 서비스 이용 기록도 모두 삭제됩니다.</p>
        <p>3. 탈퇴 전에 필요한 데이터를 미리 백업 해주세요.</p>
      </div>

      <h2 className={styles.sub}>탈퇴사유</h2>
      <div className={styles.selectBox}>
        <select css={selectBoxStyles} value={reason} onChange={handleReasonChange}>
          <option value="" css={optionStyle}>
            💡 사유를 선택해주세요
          </option>
          <option value="reason1" css={optionStyles}>
            원하는 기능이 없어요
          </option>
          <option value="reason2" css={optionStyles}>
            이용이 불편하고 버그가 많아요
          </option>
          <option value="reason3" css={optionStyles}>
            비매너 사용자를 만났어요
          </option>
          <option value="reason4" css={optionStyles}>
            개인정보를 삭제하고 싶어요
          </option>
          <option value="reason5" css={optionStyles}>
            아이디 변경 / 재가입을 하고 싶어요
          </option>
          <option value="etc" css={optionStyles}>
            기타
          </option>
        </select>
        {reason === 'etc' && (
          <input
            type="text"
            value={otherReason}
            onChange={handleOtherReasonChange}
            placeholder="직접 입력해주세요."
          />
        )}
      </div>

      <h2 className={styles.sub}>비밀번호 입력</h2>
      <div className={styles.password}>
        <input
          type={inputType}
          value={password}
          placeholder="비밀번호를 입력해주세요."
          autoComplete={autoComplete}
          onChange={handlePasswordChange}
        />
        <button className={styles.icon} type="button" onClick={handleTogglePasswordVisibility}>
          {eyeIcon}
        </button>
      </div>

      <div className={styles.buttonBox}>
        <button
          className={styles.cancelButton}
          onClick={() => {
            navigate(ROUTES.MAIN);
          }}
        >
          취소
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteAccount}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
