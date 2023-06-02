import React, { useState, useRef } from 'react';
//@ts-ignore
import styles from './login.module.scss';
//@ts-ignore
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//@ts-ignore
import cookie from 'react-cookies';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();

  function isEmailBlank(): Boolean {
    //@ts-ignore
    if (emailRef.current.value === '') {
      setIsEmail(true);

      return true;
    } else {
      setIsEmail(false);

      return false;
    }
  }

  function isPasswordBlank(): Boolean {
    //@ts-ignore
    if (passwordRef.current.value === '') {
      setIsPassword(true);

      return true;
    } else {
      setIsPassword(false);

      return false;
    }
  }

  const login = async (e: any) => {
    e.preventDefault();

    if (isEmailBlank() || isPasswordBlank()) {
      return;
    }

    const header = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'http://localhost:5500/api/v1/users/login',
        {
          //@ts-ignore
          user_email: emailRef.current.value,
          //@ts-ignore
          user_password: passwordRef.current.value,
        },
        header
      );

      const data = res.data.data;

      if (res.status == 200) {
        // const author = await res.headers['authorization'];
        // const token = author.split(' ')[1];
        const accessToken = data.accessToken;
        cookie.save('accessToken', accessToken, {
          path: '/',
        });

        // console.log(data);

        localStorage.setItem(
          'user',
          JSON.stringify({
            user_id: data.user_id,
            user_name: data.user_name,
            user_img: data.user_img || 'https://api.dicebear.com/6.x/pixel-art/svg?seed=3',
          })
        );

        navigate('/');
      } else if (res.status == 404) {
        alert('사용자 정보를 다시 확인해주세요.');
        return;
      }
    } catch (e) {
      alert('사용자 정보를 다시 확인해주세요.');
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.component}>
          <div className={styles.title}>
            <p>로그인</p>
          </div>

          <form
            onSubmit={(e) => {
              login(e);
            }}
            className={styles.form}
          >
            <div className={styles.label}>이메일</div>
            <div className={styles.input}>
              <input
                type="email"
                placeholder="이메일 입력"
                ref={emailRef}
                onBlur={isEmailBlank}
              ></input>
            </div>
            {isEmail && <div className={styles.emptyWarning}>이메일을 확인해주세요.</div>}

            <div className={styles.label}>비밀번호</div>
            <div className={styles.input}>
              <input
                type="password"
                className={styles.password}
                placeholder="비밀번호 입력"
                ref={passwordRef}
                onBlur={isPasswordBlank}
              ></input>
            </div>
            {isPassword && <div className={styles.emptyWarning}>비밀번호를 입력해주세요.</div>}
            <div className={styles.submit}>
              <button type="submit" className={styles.submitButton}>
                이메일로 계속하기
              </button>
            </div>

            <div className={styles.hrContainer}>
              <hr className={styles.hr}></hr>
            </div>
          </form>

          <div className={styles.kakaoContainer}>
            <button type="button" className={styles.kakaoLogin}>
              카카오로 계속하기
            </button>
          </div>

          <div className={styles.menu}>
            <div className={styles.registerContainer}>
              <span>아직 회원이 아니신가요? 3초 만에</span>
              <span className={styles.register}>
                <Link to="/register">가입하기</Link>
              </span>
            </div>

            <div className={styles.menuLine}>
              <span className={styles.call}>
                <Link to="/" className={styles.link}>
                  고객센터
                </Link>
              </span>
              <span className={styles.forget}>
                <Link to="/user/editpw" className={styles.link}>
                  비밀번호를 잊으셨나요?
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
