const PLACEHOLDER_STRING = {
  TITLE: `제목을 입력하세요.`,
  SUMMARY: `프로젝트 요약을 입력하세요.\n\n예시 - 온/오프라인으로 달리기 모임을 만들고 찾을 수 있는 앱을 기획 중입니다. 현재 기획자 1명, 백엔드 개발자 1명 있고, 함께 하실 디자이너와 프론트 개발자를 찾고 있어요!`,
  INTRODUCE: `프로젝트 소개를 입력하세요.`,
};

const PROJECT_TYPE_STRING = new Map<string, string>([
  ['project', '사이드 프로젝트'],
  ['study', '스터디/모임'],
]);

export { PLACEHOLDER_STRING, PROJECT_TYPE_STRING };
