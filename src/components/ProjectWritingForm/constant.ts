const placeholderString = {
  title: `제목을 입력하세요.`,
  summary: `프로젝트 요약을 입력하세요.\n\n온/오프라인으로 달리기 모임을 만들고 찾을 수 있는 앱을 기획 중입니다. 현재 기획자 1명, 백엔드 개발자 1명 있고, 함께 하실 디자이너와 프론트 개발자를 찾고 있어요!`,
  introduce: `프로젝트 소개를 입력하세요.`,
  stack: `기술 스택을 입력하세요.`,
};
const goalRadioButton = {
  portfolio: '포트폴리오/직무 역량 강화',
  founded: '창업/수익 창출',
  fun: '재미/네트워킹',
};
const timeRadioButton = {
  less: '매주 4시간 이하',
  middle: '매주 4-10시간',
  more: '매주 10시간 이상',
  etc: '기타',
};

const projectTypeString = new Map<string, string>([
  ['project', '사이드 프로젝트'],
  ['study', '스터디/모임'],
]);

export { placeholderString, goalRadioButton, timeRadioButton, projectTypeString };
