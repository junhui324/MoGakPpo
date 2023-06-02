// 현재 파일은 Fetcher의 예시를 적어둔 것이므로, 필요한대로 작성해서 쓰시면됩니다.
// 추천하는 mock 작성 방식은 API주소와 유사하게 작성하는 방법입니다.

import * as Api from './Api';
import * as ProjectType from '../interfaces/Project.interface';
import * as UserType from '../interfaces/User.interface';
import * as CommentType from '../interfaces/Comment.interface';

const domain = `/mock`;

// 개별 프로젝트 불러오기
async function getProject(projectId: number): Promise<ProjectType.TypeProject> {
  const params = `projects/${projectId}.json`;
  return await Api.get(domain, params, false);
}

// 코멘트 리스트 불러오기
async function getComment(projectId: string): Promise<CommentType.TypeComment> {
  const params = `comments/${projectId}.json`;
  return await Api.get(domain, params, false);
}
async function postComment(
  projectId: number,
  data: CommentType.TypeComment
): Promise<CommentType.TypeComment> {
  const params = `comments/${projectId}.json`;
  return await Api.post(domain, params, data);
}
async function putComment(
  commentId: number,
  data: CommentType.TypeComment
): Promise<CommentType.TypeComment> {
  const params = `comments/${commentId}.json`;
  return await Api.put(domain, params, data);
}
async function deleteComment(commentId: number): Promise<CommentType.TypeComment> {
  const params = `comments/${commentId}.json`;
  return await Api.delete(domain, params);
}

// 모든 프로젝트 리스트 불러오기
async function getProjects(): Promise<ProjectType.TypeProjectList[]> {
  const params = `projects.json`;
  return await Api.get(domain, params, false);
}

async function postProject(
  data: ProjectType.TypeProjectPost
): Promise<ProjectType.TypeProjectPost> {
  return await Api.post(domain, ``, data);
}

// 유저 프로필 불러오기
async function getUserProfile(): Promise<UserType.TypeUserProfile> {
  const params = `/user.json`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.get(domain, params, false);
}

// stack 전체 데이터 불러오기
async function getStackList(): Promise<ProjectType.TypeStacks> {
  const params = `/stack.json`;
  return await Api.get(domain, params, false);
}

// 유저 작성 게시글 불러오기
async function getUserPosts(): Promise<ProjectType.TypeUserPosts> {
  const params = `/user/posts.json`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.get(domain, params, false);
}

export {
  getProject,
  getComment,
  postComment,
  putComment,
  deleteComment,
  getProjects,
  getUserProfile,
  getStackList,
  getUserPosts,
  postProject,
};
