import React, {useState, useRef} from "react";
//@ts-ignore
import styles from "./password.module.scss";

function Password(){
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);

  function isEmailBlank():Boolean{
    //@ts-ignore
    if(emailRef.current.value === ""){
      setIsEmail(true);

      return true;
    }
    else{
      setIsEmail(false)

      return false;
    }
  }

  function isNameBlank():Boolean{
    //@ts-ignore
    if(nameRef.current.value === ""){
      setIsName(true);

      return true;
    }
    else{
      setIsName(false);

      return false;
    }
  }

  const findPassword = (e:any) =>{
    e.preventDefault();

    if(isEmailBlank() || isNameBlank()){
      return;
    }

  }

  return (<>
      <div className={styles.container}>
        <div className={styles.title}>비밀번호를 잊으셨나요?</div>
        <div className={styles.main}>
          <form onSubmit={(e) => {findPassword(e)}}>
          <div className={styles.sub}>계정 이메일 주소</div>
          <div className={styles.inputContainer}><input type = "text" ref = {emailRef} className={styles.input} onBlur={isEmailBlank}></input></div>
          {
            isEmail && <div className={styles.emptyWarning}>이메일을 확인해주세요.</div>
          }
          <div className={styles.sub}>사용자 이름</div>
          <div className={styles.inputContainer}><input type = "text" ref = {nameRef} className={styles.input} onBlur={isNameBlank}></input></div>
          {
            isName && <div className={styles.emptyWarning}>이름을 입력해주세요.</div>
          }
          <div className={styles.inputContainer}><button type = "submit" className={styles.button}>비밀번호 재설정</button></div>
          </form>
        </div>
      </div>
  </>);
}

export default Password;