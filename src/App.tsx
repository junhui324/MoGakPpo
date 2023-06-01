import React from 'react';
import './reset.css';
import ROUTES from './constants/Routes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectWritingForm from './components/ProjectWritingForm/ProjectWritingForm';
import Main from './pages/Main';
import Comment from './components/Comment/Comment';
import Header from './components/Header/Header';
import Project from './pages/Project';
import Mypage from './pages/MyPage';
import styles from './index.module.scss';
import Login from './pages/Login';
import Password from './pages/FindPassword';
import Stack from './components/Stack';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.container}>
        <Routes>
          {/* 메인 게시글 리스트*/}
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* 게시글 생성(type=study/side-project) */}
          <Route path={`${ROUTES.CREATE}:type`} element={<ProjectWritingForm />} />
          {/* 게시글 확인 */}
          <Route path={`${ROUTES.PROJECT}:id`} element={<Project />} />
          <Route path="/project/comment" element={<Comment />} />
          {/* 유저관련 */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          {/* <Route path="/register" element={}/> */}
          <Route path={ROUTES.EDIT_PASSWORD} element={<Password />} />
          {/* <Route path="/user/delete" element={}/> */}
          <Route path={ROUTES.MY_PAGE} element={<Mypage />} />
          <Route path="/stack" element={<Stack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
