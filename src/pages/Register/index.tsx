//import axios from "axios";
import axios from 'axios';
import { useState, useRef } from 'react';
//@ts-ignore
import { Link, /*useNavigate*/ 
Navigate,
useNavigate} from 'react-router-dom';
//@ts-ignore
import styles from './register.module.scss';

const API_KEY = process.env.REACT_APP_API_KEY;

function Register() {
  const emailRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const allRef = useRef<any>(null);
  const useInfoRef = useRef<any>(null);
  const ageRef = useRef<any>(null);
  const privacyRef = useRef<any>(null);
  const marketingRef = useRef<any>(null);

  const [isEmail, setIsEmail] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const navigate = useNavigate();

  function CheckEmail(str: any) {
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  function isAllCheck() {
    if (allRef.current.checked) {
      ageRef.current.checked = true;
      useInfoRef.current.checked = true;
      privacyRef.current.checked = true;
      marketingRef.current.checked = true;
    } else {
      ageRef.current.checked = false;
      useInfoRef.current.checked = false;
      privacyRef.current.checked = false;
      marketingRef.current.checked = false;
    }
  }

  function isEmailBlank(): Boolean {
    if (!CheckEmail(emailRef.current.value)) {
      setIsEmail(true);

      return true;
    } else {
      setIsEmail(false);

      return false;
    }
  }

  function isNameBlank(): Boolean {
    if (nameRef.current.value === '') {
      setIsName(true);

      return true;
    } else {
      setIsName(false);

      return false;
    }
  }

  function isPasswordBlank(): Boolean {
    if (passwordRef.current.value.length < 6) {
      setIsPassword(true);

      return true;
    } else {
      setIsPassword(false);

      return false;
    }
  }

  const isAll = () =>{
    if (
      ageRef.current.checked === true &&
      useInfoRef.current.checked === true && 
      privacyRef.current.checked === true &&
      marketingRef.current.checked === true){
        allRef.current.checked = true;
      }
      else{
        allRef.current.checked = false;
      }

  }

  const register = async (e: any) => {
    e.preventDefault();

    if (isNameBlank() || isEmailBlank() || isPasswordBlank()) {
      return;
    }
    if (!ageRef.current.checked) {
      alert('만 14세 이상에 동의해주세요.');
      return;
    }
    if (!useInfoRef.current.checked) {
      alert('커리어리 이용약관에 동의해주세요.');
      return;
    }
    if (!privacyRef.current.checked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    try{
      const header = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const res = await axios.post(`${API_KEY}/users/signup`, {
      user_email:emailRef.current.value,
      user_name:nameRef.current.value,
      user_password:passwordRef.current.value,
    }, header);

    const data = res.data;

    if(res.status === 201){
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    }
    }
    catch(e:any){
      alert("중복된 이메일입니다.");
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainTitle}>요즘 개발자 커뮤니티</div>
        <div className={styles.subTitle}>지금 모프에 가입하세요</div>
        <div className={styles.part}>
          <div className={styles.partTitle}>이메일로 시작하기</div>
          <div className={styles.partMain}>
            <form onSubmit={(e) => register(e)}>
              <div className={styles.inputContainer}>
                <div className={styles.desc}>이름</div>
                <div className={styles.input}>
                  <input
                    type="text"
                    className={styles.inputMethod}
                    placeholder="프로필 이름"
                    onBlur={isNameBlank}
                    ref={nameRef}
                  ></input>
                </div>
              </div>
              {isName && <div className={styles.emptyWarning}>이름을 입력해주세요.</div>}
              <div className={styles.inputContainer}>
                <div className={styles.desc}>이메일</div>
                <div className={styles.input}>
                  <input
                    type="text"
                    className={styles.inputMethod}
                    placeholder="example@publy.co"
                    onBlur={isEmailBlank}
                    ref={emailRef}
                  ></input>
                </div>
              </div>
              {isEmail && <div className={styles.emptyWarning}>이메일을 확인해주세요.</div>}
              <div className={styles.inputContainer}>
                <div className={styles.desc}>비밀번호</div>
                <div className={styles.input}>
                  <input
                    type="password"
                    className={styles.inputMethod}
                    placeholder="영문, 숫자 포함 6자 이상"
                    onBlur={isPasswordBlank}
                    ref={passwordRef}
                  ></input>
                </div>
              </div>
              {isPassword && <div className={styles.emptyWarning}>비밀번호를 확인해주세요.</div>}
              <div className={styles.checkContainer}>
                <div className={styles.allCheck}>
                  <input
                    type="checkbox"
                    id="all"
                    className={styles.all}
                    onChange={isAllCheck}
                    ref={allRef}
                  ></input>
                  <label htmlFor="all" className={styles.checkLabel}>
                    모두 동의
                  </label>
                </div>
                <div className={styles.allCheck}>
                  <input type="checkbox" id="age" className={styles.all} ref={ageRef} onChange={isAll}></input>
                  <label htmlFor="age" className={styles.checkLabel}>
                    (필수) 만 14세 이상입니다.
                  </label>
                </div>
                <div className={styles.allCheck}>
                  <input type="checkbox" id="use" className={styles.all} ref={useInfoRef} onChange={isAll}></input>
                  <label htmlFor="use" className={styles.checkLabel}>
                    (필수) 커리어리 이용약관 동의
                  </label>
                </div>
                <div className={styles.allCheck}>
                  <input
                    type="checkbox"
                    id="privacy"
                    className={styles.all}
                    ref={privacyRef}
                    onChange={isAll}
                  ></input>
                  <label htmlFor="privacy" className={styles.checkLabel}>
                    (필수) 개인정보 수집 및 이용 동의
                  </label>
                </div>
                <div className={styles.allCheck}>
                  <input
                    type="checkbox"
                    id="marketing"
                    className={styles.all}
                    ref={marketingRef}
                    onChange={isAll}
                  ></input>
                  <label htmlFor="marketing" className={styles.checkLabel}>
                    (선택) 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>

              <div className={styles.registerButtonContainer}>
                <button type="submit" className={styles.registerButton}>
                  회원가입
                </button>
              </div>
            </form>
          </div>
          <div className={styles.loginContainer}>
            <span className={styles.loginDesc}>이미 회원이신가요?</span>
            <Link to="/login" className={styles.loginLink}>
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
