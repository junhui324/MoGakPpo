import React, {useState, useRef} from "react";
import styles from "./login.module.scss";
import {Link} from "react-router-dom";

function Login(){
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  function isEmailBlank(){
    //@ts-ignore
    if(emailRef.current.value === ""){
      setIsEmail(true);
    }
    else{
      setIsEmail(false)
    }
  }

  function isPasswordBlank(){
    //@ts-ignore
    if(passwordRef.current.value === ""){
      setIsPassword(true);
    }
    else{
      setIsPassword(false)
    }
  }

  return(
    <>
        <div className={styles.container}>
          <div className={styles.component}>
              <div className={styles.title}><p>로그인</p></div>

              <form method = "post" action = "" className={styles.form}>
                <div className={styles.label}>
                이메일
                </div>
                  <div className={styles.input}>
                  <input type = "email" placeholder="이메일 입력" ref = {emailRef} onBlur={isEmailBlank}></input>
                 </div>
                  {
                    isEmail && <div className={styles.emptyWarning}>이메일을 확인해주세요.</div>
                  }
                  
                 <div className={styles.label}>
                비밀번호
                </div>
                  <div className={styles.input}>
                  <input type = "password" placeholder="비밀번호 입력" ref = {passwordRef} onBlur={isPasswordBlank}></input>
                 </div>
                  {
                    isPassword && <div className={styles.emptyWarning}>비밀번호를 입력해주세요.</div>
                  }
                 <div className={styles.submit}>
                  <button type="submit" className={styles.submitButton}>이메일로 계속하기</button>
                
                 </div>
                 
                 <div className={styles.hrContainer}>
                 <hr className={styles.hr}></hr>
                 </div>
              </form>

              <div className={styles.kakaoContainer}>
                <button type = "button" className={styles.kakaoLogin}>카카오로 계속하기</button>
              </div>

              <div className={styles.menu}>
                <div className={styles.registerContainer}>
                  <span>아직 회원이 아니신가요? 3초 만에</span>
                  <span className={styles.register}><Link to = "/register">가입하기</Link></span>
                </div>

                <div className={styles.menuLine}>
                  <span className={styles.call}><Link to = "/" className={styles.link}>고객센터</Link></span>
                  <span className={styles.forget}><Link to = "/" className={styles.link}>비밀번호를 잊으셨나요?</Link></span>
                </div>


              </div>
          </div>

        </div>
        
    </>
  )
}

export default Login;