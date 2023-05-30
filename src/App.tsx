import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostWritingForm from './components/PostWritingForm/PostWritingForm';

function App() {
  return (
    <BrowserRouter>
      <div className="header">사이드 프로젝트 구인 플랫폼</div>

      <Routes>
        {/* 메인 게시글 리스트*/}
        {/* <Route path="/" element={} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        {/* 게시글 생성(type=study/side-project) */}
        {/* <Route path="/create/:type" element={<PostWritingForm />} /> */}
        <Route path="/create" element={<PostWritingForm />} />
        {/* 게시글 확인 */}
        {/* <Route path="/project/:id" element={} /> */}
        {/* 유저관련 */}
        {/* <Route path="/login" element={}/> */}
        {/* <Route path="/register" element={}/> */}
        {/* <Route path="/user/editPw" element={}/> */}
        {/* <Route path="/user/delete" element={}/> */}
        {/* <Route path="/user/mypage" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
