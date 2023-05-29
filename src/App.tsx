import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>모두의 취업준비 :: 취뽀</div>

      <Routes>
        {/* 메인,스트림 룸 관련 */}
        {/* <Route path="/" element={} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        {/* <Route path="/room/enter/:roomId" element={} /> */}
        {/* <Route path="/room/:roomId" element={} /> */}
        {/* <Route path="/room/create" element={} /> */}
        {/* <Route path="/room/create" element={} /> */}
        {/* AI면접 관련 */}
        {/* <Route path="/interview" element={} /> */}
        {/* 유저관련 */}
        {/* <Route path="/login" element={}/> */}
        {/* <Route path="/register" element={}/> */}
        {/* <Route path="/user/editPw" element={}/> */}
        {/* <Route path="/user/delete" element={}/> */}
        {/* <Route path="/user/mypage" element={}/> */}
        {/* <Route path="/user/mypage/history" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
