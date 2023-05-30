import React from 'react';
import './reset.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Comment from './components/Comment/Comment';
import Main from './pages/Main';
import styles from './index.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="header">사이드 프로젝트 구인 플랫폼</div>
      <div className={styles.container}>
        <Routes>
          {/* 메인 게시글 리스트*/}
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* 게시글 생성(type=study/side-project) */}
          {/* <Route path="/create/:type" element={} /> */}
          {/* 게시글 확인 */}
          {/* <Route path="/project/:id" element={} /> */}
          <Route path="/project/comment" element={<Comment />} />
          {/* 유저관련 */}
          {/* <Route path="/login" element={}/> */}
          {/* <Route path="/register" element={}/> */}
          {/* <Route path="/user/editPw" element={}/> */}
          {/* <Route path="/user/delete" element={}/> */}
          {/* <Route path="/user/mypage" element={}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
