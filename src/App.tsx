import React from 'react';
import './reset.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Comment from './components/Comment/Comment';
import Header from './components/Header/Header';
import Project from './pages/Project';
import Mypage from './pages/Mypage';
import styles from './index.module.scss';
import Login from './pages/Login';
import Password from './pages/FindPassword';
import ProjectWriting from './pages/ProjectWriting';
import Stack from './components/Stack';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.container}>
        <Routes>
          {/* 메인 게시글 리스트*/}
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* 게시글 생성(type=study/side-project) */}
          <Route path="/create/:type" element={<ProjectWriting />} />
          {/* 게시글 확인 */}
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/comment" element={<Comment />} />
          {/* 유저관련 */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={}/> */}
          <Route path="/user/editpw" element={<Password />} />
          {/* <Route path="/user/delete" element={}/> */}
          <Route path="/user/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
