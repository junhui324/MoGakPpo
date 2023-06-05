// 현재 파일은 Fetcher의 예시를 적어둔 것이므로, 필요한대로 작성해서 쓰시면됩니다.
// 추천하는 mock 작성 방식은 API주소와 유사하게 작성하는 방법입니다.

import * as Api from './Api';
import * as ProjectType from '../interfaces/Project.interface';
import * as UserType from '../interfaces/User.interface';
import * as StackType from '../interfaces/Stack.interface';
import * as CommentType from '../interfaces/Comment.interface';
import { AxiosResponse } from 'axios';

const domain = `/mock`;

const DOMAIN = `http://34.64.242.119:5000/api/v1`;

const API_KEY = process.env.REACT_APP_API_KEY;

// 개별 프로젝트 불러오기
async function getProject(projectId: number): Promise<ProjectType.TypeProject> {
  const params = `projects/info/${projectId}`;
  const response: AxiosResponse = await Api.get(API_KEY, params);
  return response.data;
}

// 코멘트 리스트 불러오기
async function getComment(projectId: string): Promise<CommentType.TypeComment> {
  const params = `comments/${projectId}.json`;
  return await Api.get(domain, params, false);
}
async function postComment(
  projectId: string,
  data: CommentType.TypeCommentPost
): Promise<CommentType.TypeCommentPost> {
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
async function deleteComment(commentId: number): Promise<CommentType.TypeCommentPost> {
  const params = `comments/${commentId}.json`;
  return await Api.delete(domain, params);
}

// 모든 프로젝트 리스트 불러오기
async function getProjects(): Promise<{ message: string; data: ProjectType.TypeProjectList[] }> {
  const params = `projects`;
  return await Api.get(API_KEY, params, false);
}

// 카테고리로 프로젝트 리스트 불러오기
async function getProjectsByCategory(
  categoryId: string
): Promise<{ message: string; data: ProjectType.TypeProjectList[] }> {
  const params = `projects/role/${categoryId}`;
  return await Api.get(API_KEY, params, false);
}

// 검색어로 프로젝트 리스트 불러오기
async function getProjectsByKeyword(
  categoryId: string,
  keyword: string
): Promise<{ message: string; data: ProjectType.TypeProjectList[] }> {
  const params = `projects/cate=${categoryId}&search=${keyword}.json`;
  return await Api.get(domain, params, false);
}

async function postProject(
  data: ProjectType.TypeProjectPost
): Promise<ProjectType.TypeProjectPost> {
  return await Api.post(domain, ``, data);
}

// 유저 프로필 불러오기
async function getUserProfile(): Promise<{
  message: string;
  data: UserType.TypeUserProfile;
}> {
  const params = `/user/profile.json`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.get(domain, params, false);
}

// stack 전체 데이터 불러오기
async function getStackList(): Promise<{
  message: string;
  data: StackType.TypeStacks;
}> {
  const params = `stacks`;
  return await Api.get(DOMAIN, params, false);
}

// 유저 작성 게시글 불러오기
async function getUserPosts(): Promise<{
  message: string;
  data: { user_projects: ProjectType.TypeUserPosts };
}> {
  const params = `projects/user`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.get(API_KEY, params, true);
}

// 유저 정보 수정하기
async function updateUserProfile(
  data: UserType.TypeUserProfile
): Promise<UserType.TypeUserProfile> {
  const params = `/user/profile.json`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.put(domain, params, data, false);
}

// 유저 작성 댓글 불러오기
async function getUserComments(): Promise<{
  message: string;
  data: { project_comments: CommentType.TypeMypageComments };
}> {
  const params = `/user/comments.json`;
  // 나중에 마지막 매개변수 false -> true 로 수정해야 함
  return await Api.get(domain, params, false);
}

export {
  updateUserProfile,
  getUserComments,
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
  getProjectsByCategory,
  getProjectsByKeyword,
};
