import axios from "axios";
import React, {useState, useRef} from "react";
//@ts-ignore
import {Link, useNavigate} from "react-router-dom";
//@ts-ignore
import styles from "./register.module.scss";


function Register(){
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const allRef = useRef(null);
  const useInfoRef = useRef(null);
  const ageRef = useRef(null);
  const privacyRef = useRef(null);
  const marketingRef = useRef(null);
  const header = {
    headers: {
    "Content-type": "application/json",
    },
  };
  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [all, setAll] = useState(false);

  function CheckEmail(str:any){                                                 
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(str)) {                            
       return false;         
    }else {                       
       return true;         
    }                            
}

  function isAllCheck(){
    //@ts-ignore
    if(allRef.current.checked){
      //@ts-ignore
      ageRef.current.checked = true;
      //@ts-ignore
      useInfoRef.current.checked=true;
      //@ts-ignore
      privacyRef.current.checked=true;
      //@ts-ignore
      marketingRef.current.checked=true;
    }
    else{
      //@ts-ignore
      ageRef.current.checked = false;
      //@ts-ignore
      useInfoRef.current.checked=false;
      //@ts-ignore
      privacyRef.current.checked=false;
      //@ts-ignore
      marketingRef.current.checked=false;
    }
  }

  function isEmailBlank():Boolean{
    //@ts-ignore
    if(!CheckEmail(emailRef.current.value))	{
      setIsEmail(true)

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
      setIsName(false)

      return false;
    }
  }

  function isPasswordBlank():Boolean{
    //@ts-ignore
    if(passwordRef.current.value.length < 6){
      setIsPassword(true);

      return true;
    }
    else{
      setIsPassword(false)

      return false;
    }
  }

  const register = async (e:any) =>{
    e.preventDefault();

    if(isNameBlank() || isEmailBlank() || isPasswordBlank()){
      return;
    }

    //@ts-ignore
    if(!ageRef.current.checked){
      alert("만 14세 이상에 동의해주세요.");
      return;
    }

    //@ts-ignore
    if(!useInfoRef.current.checked){
      alert("커리어리 이용약관에 동의해주세요.");
      return;
    }

    //@ts-ignore
    if(!privacyRef.current.checked){
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
  }


  return (<>
  <div className={styles.container}>
    <div className={styles.mainTitle}>요즘 개발자 커뮤니티</div>
      <div className={styles.subTitle}>지금 커리어리에 가입하세요</div>
    <div className={styles.part}>
    <div className={styles.partTitle}>이메일로 시작하기</div>
      <div className={styles.partMain}>
        <form onSubmit = {(e) => register(e)}>
        <div className={styles.inputContainer}>
          <div className={styles.desc}>이름</div>
          <div className={styles.input}><input type = "text" className={styles.inputMethod} placeholder="프로필 이름" onBlur={isNameBlank} ref = {nameRef}></input></div>
        </div>
        {
          isName && <div className={styles.emptyWarning}>이름을 입력해주세요.</div>
        }
        <div className={styles.inputContainer}>
          <div className={styles.desc}>이메일</div>
          <div className={styles.input}><input type = "text" className={styles.inputMethod} placeholder="example@publy.co" onBlur={isEmailBlank} ref = {emailRef}></input></div>
        </div>
        {
          isEmail && <div className={styles.emptyWarning}>이메일을 확인해주세요.</div>
        }
        <div className={styles.inputContainer}>
          <div className={styles.desc}>비밀번호</div>
          <div className={styles.input}><input type = "password" className={styles.inputMethod} placeholder="영문, 숫자 포함 6자 이상" onBlur={isPasswordBlank} ref = {passwordRef}></input></div>
        </div>
        {
          isPassword && <div className={styles.emptyWarning}>비밀번호를 확인해주세요.</div>
        }
        <div className={styles.checkContainer}>
          <div className={styles.allCheck}>
            <input type="checkbox" id = "all" className={styles.all} onChange = {isAllCheck} ref={allRef}></input>
            <label htmlFor="all" className={styles.checkLabel}>모두 동의</label>
          </div>
          <div className={styles.allCheck}>
            <input type="checkbox" id = "age" className={styles.all} ref={ageRef}></input>
            <label htmlFor="age" className={styles.checkLabel}>(필수) 만 14세 이상입니다.</label>
          </div>
          <div className={styles.allCheck}>
            <input type="checkbox" id = "use" className={styles.all} ref={useInfoRef}></input>
            <label htmlFor="use" className={styles.checkLabel}>(필수) 커리어리 이용약관 동의</label>
          </div>
          <div className={styles.allCheck}>
            <input type="checkbox" id = "privacy" className={styles.all} ref={privacyRef}></input>
            <label htmlFor="privacy" className={styles.checkLabel}>(필수) 개인정보 수집 및 이용 동의</label>
          </div>
          <div className={styles.allCheck}>
            <input type="checkbox" id = "marketing" className={styles.all} ref={marketingRef}></input>
            <label htmlFor="marketing" className={styles.checkLabel}>(선택) 마케팅 정보 수신 동의</label>
          </div>
        </div>

        <div className={styles.registerButtonContainer}>
          <button type="submit" className={styles.registerButton}>회원가입</button>
        </div>
        </form>

      </div>
      <div className={styles.loginContainer}>
        <span className={styles.loginDesc}>이미 회원이신가요?</span><Link to = "/login" className={styles.loginLink}>로그인하기</Link>


      </div>
    </div>

  </div>
  </>);
}

export default Register;