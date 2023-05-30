// 현재 파일은 Fetcher의 예시를 적어둔 것이므로, 필요한대로 작성해서 쓰시면됩니다.
// 추천하는 mock 작성 방식은 API주소와 유사하게 작성하는 방법입니다.

import * as Api from './Api';

const domain = `/mock`;

// 개별 프로젝트 불러오기
async function getProject(projectId: number) {
  const params = `project/${projectId}.json`;
  return await Api.get(domain, params, false);
}

export { getProject };
