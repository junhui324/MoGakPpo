import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RadioButton from './RadioButton';

interface Post {
  title: string;
  summary: string;
  introduce: string;
}

const placeholderString = {
  title: `제목을 입력하세요.`,
  summary: `프로젝트 요약을 입력하세요.\n\n온/오프라인으로 달리기 모임을 만들고 찾을 수 있는 앱을 기획 중입니다. 현재 기획자 1명, 백엔드 개발자 1명 있고, 함께 하실 디자이너와 프론트 개발자를 찾고 있어요!`,
  introduce: `프로젝트 소개를 입력하세요.`,
};
const objectiveRadioButton = ['포트폴리오/직무 역량 강화', '창업/수익 창출', '재미/네트워킹'];
const timeRadioButton = ['매주 4시간 이하', '매주 4-10시간', '메주 10시간 이상'];

function PostWritingForm() {
  const [post, setPost] = useState<Post>({
    title: '',
    summary: '',
    introduce: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시물 데이터를 서버에 전송하거나 필요한 처리를 수행합니다.
    console.log(post);
    // 게시물 작성 후 초기화
    setPost({ title: '', summary: '', introduce: '' });
  };

  return (
    <div>
      <nav></nav>
      <div className="mainForm">
        <div className="postWriteForm">
          <div className="title">
            <div className="type">
              <p>사이드 프로젝트</p>
            </div>
            <input
              className="titleTextarea"
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder={placeholderString.title}
            ></input>
            {post.title}
          </div>

          <div>
            <h2 className="summary">요약</h2>
            <div className="summaryBox">
              <textarea
                className="summaryTextarea"
                name="summary"
                value={post.summary}
                onChange={handleChange}
                placeholder={placeholderString.summary}
              ></textarea>
              {post.summary}
            </div>
          </div>

          <div>
            <h2 className="role">모집 역할</h2>
            <div className="checkbox">
              <div>
                <input type="checkbox" id="engineeringFrontend"></input>
                <label htmlFor="engineeringFrontend">프론트엔드</label>
              </div>
              <div>
                <input type="checkbox" id="engineeringBackend"></input>
                <label htmlFor="engineeringBackend">백엔드</label>
              </div>
              <div>
                <input type="checkbox" id="design"></input>
                <label htmlFor="design">디자인</label>
              </div>
              <div>
                <input type="checkbox" id="pm"></input>
                <label htmlFor="pm">기획</label>
              </div>
              <div>
                <input type="checkbox" id="other"></input>
                <label htmlFor="other">디자인</label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="objective">목적</h2>
            <div className="radio">
              <label>
                <input type="radio"></input>
                <label htmlFor="objectiveOption1">포트폴리오/직무 역량 강화</label>
              </label>
              <label>
                <input type="radio" id="objectiveOption1"></input>
                <label htmlFor="objectiveOption1">포트폴리오/직무 역량 강화</label>
              </label>
              <div>
                <input type="radio" id="objectiveOption2"></input>
                <label htmlFor="objectiveOption2">창업/수익 창출</label>
              </div>
              <div>
                <input type="radio" id="objectiveOption3"></input>
                <label htmlFor="objectiveOption3">재미/네트워킹</label>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2>참여 시간 (선택)</h2>
              <div>
                <span>추후 아이콘으로 바꾸기</span>
                <p className="arrowBox">매주 프로젝트에 쓸 수 있는 시간</p>
              </div>
            </div>
            <div>
              <div className="radio">
                <input type="radio" id="timeOption1"></input>
                <label htmlFor="timeOption1">매주 4시간 이하</label>
              </div>
              <div>
                <input type="radio" id="timeOption2"></input>
                <label htmlFor="timeOption2">매주 4-10시간</label>
              </div>
              <div>
                <input type="radio" id="timeOption2"></input>
                <label htmlFor="timeOption2">매주 10시간 이상</label>
              </div>
            </div>
          </div>

          <div>
            <h2>소개</h2>
            <div>
              <textarea
                className="introduceTextarea"
                name="introduce"
                value={post.introduce}
                onChange={handleChange}
                placeholder={placeholderString.introduce}
              ></textarea>
              {post.introduce}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostWritingForm;
