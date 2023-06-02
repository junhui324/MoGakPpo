import React, { useEffect, useState } from 'react';
import './reset.css';
import ROUTES from './constants/Routes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Comment from './components/Comment';
import Header from './components/Header/Header';
import Project from './pages/Project';
import MyPage from './pages/MyPage';
import styles from './index.module.scss';
import Login from './pages/Login';
import Password from './pages/FindPassword';
import ProjectWriting from './pages/ProjectWriting';
import UpdateUser from './pages/UpdateUser';
import Register from './pages/Register';
import { getIsLoggedIn } from './hooks/login';
//@ts-ignore
import cookie from 'react-cookies';

function App() {
  //로그인, 로그아웃 시 해당 상태 값이 변경되어야합
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className={styles.container}>
        <Routes>
          {/* 메인 게시글 리스트*/}
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* 게시글 생성(type=study/side-project) */}
          <Route path={`${ROUTES.CREATE}:type`} element={<ProjectWriting />} />
          {/* 게시글 확인 */}
          <Route path={`${ROUTES.PROJECT}:id`} element={<Project />} />
          <Route path="/comments/:id" element={<Comment />} />
          {/* 유저관련 */}
          <Route path={ROUTES.LOGIN} element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* <Route path="/register" element={}/> */}
          <Route path={ROUTES.EDIT_PASSWORD} element={<Password />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          {/* <Route path="/user/delete" element={}/> */}
          <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
          <Route path={ROUTES.USER_UPDATE} element={<UpdateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
