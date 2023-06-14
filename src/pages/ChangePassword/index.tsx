import React, { useState, useRef, useContext, useEffect } from 'react';
import styles from './change.password.module.scss';
import { useRecoilValue } from 'recoil';
import { isLoginAtom, loginAtom } from '../../recoil/loginState';
import { patchPasswordReset } from '../../apis/Fetcher';
import { useNavigate } from 'react-router-dom';
import MyPage from '../MyPage';
import ROUTES from '../../constants/Routes';
import { getToken } from '../../apis/Token';

export default function ChangePassword() {
  const currentPasswordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const loginData = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const accessToken = getToken();

  useEffect(() =>{
    if(!accessToken){
      console.log(accessToken);
      navigate("/");
    }
  }, []);

  const isCurrentPasswordBlank = () => {
    if (currentPasswordRef.current.value === '') {
      setCurrentPassword(true);

      return true;
    } else {
      setCurrentPassword(false);

      return false;
    }
  }

  const isNewPasswordBlank = () => {
    if (newPasswordRef.current.value === '') {
      setNewPassword(true);

      return true;
    } else {
      setNewPassword(false);

      return false;
    }
  }

  const isPasswordConfirmBlank = () => {
    if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
      setPasswordConfirm(true);

      return true;
    } else {
      setPasswordConfirm(false);

      return false;
    }
  }

  const changePassword = async (e: any) => {
    e.preventDefault();

    if (isCurrentPasswordBlank() || isNewPasswordBlank() || isPasswordConfirmBlank()) {
      return;
    }

    try {
      const res = await patchPasswordReset({
        user_password: currentPasswordRef.current.value,
        user_new_password: newPasswordRef.current.value,
      });

      if (res.status === 200 || res.status === undefined) {
        alert('비밀번호 변경이 완료되었습니다.');
        console.log(`${API_KEY}${ROUTES.MY_PAGE}`);
        navigate(`${ROUTES.MY_PAGE}`);
      }
      
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '400':
            alert('비밀번호가 일치하지 않습니다.');
            currentPasswordRef.current.value = '';
            currentPasswordRef.current.focus();
        }
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>비밀번호를 수정하실건가요?</div>
        <div className={styles.main}>
          <form
            onSubmit={(e) => {
              changePassword(e);
            }}
          >
            <div className={styles.sub}>현재 비밀번호</div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                ref={currentPasswordRef}
                className={styles.input}
                onBlur={isCurrentPasswordBlank}
              ></input>
            </div>
            {currentPassword && (
              <div className={styles.emptyWarning}>현재 비밀번호를 확인해주세요.</div>
            )}
            <div className={styles.sub}>새 비밀번호</div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                ref={newPasswordRef}
                className={styles.input}
                onBlur={isNewPasswordBlank}
              ></input>
            </div>
            {newPassword && <div className={styles.emptyWarning}>새 비밀번호를 입력해주세요.</div>}

            <div className={styles.sub}>새 비밀번호 확인</div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                ref={passwordConfirmRef}
                className={styles.input}
                onBlur={isPasswordConfirmBlank}
              ></input>
            </div>
            {passwordConfirm && (
              <div className={styles.emptyWarning}>새 비밀번호가 일치하지 않습니다.</div>
            )}
            <div className={styles.inputContainer}>
              <button type="submit" className={styles.button}>
                비밀번호 재설정
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
