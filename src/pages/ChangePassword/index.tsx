import React, {useState, useRef, useContext, useEffect} from "react";
import styles from "./change.password.module.scss";
import { useRecoilValue } from "recoil";
import { loginAtom } from '../../recoil/loginState';

export default function ChangePassword(){
  const currentPasswordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const loginData = useRecoilValue(loginAtom);

  useEffect(() =>{
    console.log(loginData);
  });

  function isCurrentPasswordBlank():Boolean{
    if(currentPasswordRef.current.value === ""){
      setCurrentPassword(true);

      return true;
    }
    else{
      setCurrentPassword(false)

      return false;
    }
  }

  function isNewPasswordBlank():Boolean{
    if(newPasswordRef.current.value === ""){
      setNewPassword(true);

      return true;
    }
    else{
      setNewPassword(false);

      return false;
    }
  }

  function isPasswordConfirmBlank():Boolean{
    if(newPasswordRef.current.value !== passwordConfirmRef.current.value){
      setPasswordConfirm(true);

      return true;
    }
    else{
      setPasswordConfirm(false);

      return false;
    }
  }

  const findPassword = (e:any) =>{
    e.preventDefault();

    if(isCurrentPasswordBlank() || isNewPasswordBlank() || isPasswordConfirmBlank()){
      return;
    }

  }

  return (<>
      <div className={styles.container}>
        <div className={styles.title}>비밀번호를 수정하실건가요?</div>
        <div className={styles.main}>
          <form onSubmit={(e) => {findPassword(e)}}>
          <div className={styles.sub}>현재 비밀번호</div>
          <div className={styles.inputContainer}><input type = "password" ref = {currentPasswordRef} className={styles.input} onBlur={isCurrentPasswordBlank}></input></div>
          {
            currentPassword && <div className={styles.emptyWarning}>현재 비밀번호를 확인해주세요.</div>
          }
          <div className={styles.sub}>새 비밀번호</div>
          <div className={styles.inputContainer}><input type = "password" ref = {newPasswordRef} className={styles.input} onBlur={isNewPasswordBlank}></input></div>
          {
            newPassword && <div className={styles.emptyWarning}>새 비밀번호를 입력해주세요.</div>
          }

          <div className={styles.sub}>새 비밀번호 확인</div>
          <div className={styles.inputContainer}><input type = "password" ref = {passwordConfirmRef} className={styles.input} onBlur={isPasswordConfirmBlank}></input></div>
          {
            passwordConfirm && <div className={styles.emptyWarning}>새 비밀번호가 일치하지 않습니다.</div>
          }
          <div className={styles.inputContainer}><button type = "submit" className={styles.button}>비밀번호 재설정</button></div>
          </form>
        </div>
      </div>
  </>);
}
