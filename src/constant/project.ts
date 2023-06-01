const PROJECT_TYPE: TYPEPROJECTCONSTANT = {
  STUDY: '스터디/모임',
  PROJECT: '사이드 프로젝트',
};

type TYPEPROJECTCONSTANT = {
  [key: string]: string;
};
const PROJECT_GOAL: TYPEPROJECTCONSTANT = {
  PORTFOLIO: '포트폴리오/직무 역량 강화',
  FOUNDED: '창업/수익 창출',
  FUN: '재미/네트워킹',
};

const PROJECT_PARTICIPATION_TIME: TYPEPROJECTCONSTANT = {
  LESS: '매주 4시간 이하',
  MIDDLE: '매주 4-10시간',
  MORE: '매주 10시간 이상',
  TIME_ETC: '기타',
};

const PROJECT_RECRUITMENT_ROLES = {
  FRONT: '프론트엔드',
  BACK: '백엔드',
  DESIGN: '디자인',
  PM: '기획',
  ROLE_ETC: '기타',
};

const PROJECT_RECRUITMENT_STATUS = {
  RECRUITING: '모집 중',
  COMPLETE: '모집 완료',
};

export {
  PROJECT_TYPE,
  PROJECT_GOAL,
  PROJECT_PARTICIPATION_TIME,
  PROJECT_RECRUITMENT_ROLES,
  PROJECT_RECRUITMENT_STATUS,
};
