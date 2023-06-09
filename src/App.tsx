// import React from 'react';
import './reset.css';
import ROUTES from './constants/Routes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectListMain from './pages/ProjectList';
// import Comment from './components/Comment';
import Header from './components/Header/Header';
import Project from './pages/Project';
import MyPage from './pages/MyPage';
import styles from './index.module.scss';
import Login from './pages/Login';
import Password from './pages/ChangePassword';
import ProjectWriting from './pages/ProjectWriting';
import UpdateUser from './pages/UpdateUser';
import Register from './pages/Register';
import Home from './pages/Home/Home';
import UserPage from './pages/UserPage';
import Modify from './pages/ProjectModify';
import Preview from './pages/ProjectPreview';
import PortfolioWriting from './pages/Portfolio/PortfolioWriting';
import Main from './pages/Main';
import HighlightEditor from './components/Editor/HighlightEditor';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          {/* 메인 게시글 리스트*/}
          <Route path={ROUTES.PROJECT_LIST} element={<ProjectListMain />} />
          {/* 게시글 생성(type=study/side-project) */}
          <Route path={`${ROUTES.CREATE}:type`} element={<ProjectWriting />} />
          {/* 게시글 확인 */}
          <Route path={`${ROUTES.PROJECT}:id`} element={<Project />} />
          {/* 유저관련 */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          {/* <Route path="/register" element={}/> */}
          <Route path={ROUTES.EDIT_PASSWORD} element={<Password />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          {/* <Route path="/user/delete" element={}/> */}
          <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
          <Route path={ROUTES.USER_UPDATE} element={<UpdateUser />} />
          <Route path={`${ROUTES.USER_PAGE}:id`} element={<UserPage />} />
          <Route path={ROUTES.MODIFY_PROJECT} element={<Modify />} />
          <Route path={ROUTES.PREVIEW_PROJECT} element={<Preview />} />
          <Route path="/main" element={<Main />} />
          <Route path={ROUTES.PORTFOLIO_CREATE} element={<PortfolioWriting />} />
          <Route path='/highlight' element={<HighlightEditor/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
