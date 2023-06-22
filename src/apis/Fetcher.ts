// 현재 파일은 Fetcher의 예시를 적어둔 것이므로, 필요한대로 작성해서 쓰시면됩니다.
// 추천하는 mock 작성 방식은 API주소와 유사하게 작성하는 방법입니다.

import * as Api from './Api';
import * as ProjectType from '../interfaces/Project.interface';
import * as PortfolioType from '../interfaces/Portfolio.interface';
import * as UserType from '../interfaces/User.interface';
import * as StackType from '../interfaces/Stack.interface';
import * as CommentType from '../interfaces/Comment.interface';
import { AxiosResponse } from 'axios';
import * as Token from './Token';
import { TypePortfolioList } from '../interfaces/Portfolio.interface';

const domain = `/mock`;

// const DOMAIN = `http://34.64.242.119:5000/api/v1`;
const API_KEY = process.env.REACT_APP_API_KEY;

/*
  프로젝트 관련
*/

// 개별 프로젝트 불러오기
export async function getProject(projectId: number): Promise<ProjectType.TypeProject> {
  const params = `projects/info/${projectId}`;
  const response: AxiosResponse = await Api.get(API_KEY, params);
  return response.data;
}

// 프로젝트 모집 완료 처리
export async function patchProjectStatus(projectId: number): Promise<AxiosResponse> {
  const params = `projects/recruitment/status/${projectId}`;
  const data = {
    project_recruitment_status: 'COMPLETE',
  };
  const response: AxiosResponse = await Api.patch(API_KEY, params, data);
  return response;
}

// 프로젝트 삭제
export async function deleteProject(projectId: number): Promise<AxiosResponse> {
  const params = `projects/recruitment/${projectId}`;
  const response: AxiosResponse = await Api.delete(API_KEY, params);
  return response;
}

// 프로젝트 북마크 등록
export async function postProjectBookmark(projectId: number): Promise<{ bookmark_id: number }> {
  // 비회원 오류 이슈가 있었으므로 추가하였음.
  if (!Token.getToken()) throw new Error('로그인이 필요한 요청입니다.');

  const params = `bookmarks/project`;
  const data = {
    project_id: projectId,
  };
  const response: AxiosResponse = await Api.post(API_KEY, params, data);
  return response.data;
}

// 프로젝트 북마크 취소
export async function deleteProjectBookmark(projectId: number): Promise<{ bookmark_id: number }> {
  const params = `bookmarks/project/${projectId}`;
  const response: AxiosResponse = await Api.delete(API_KEY, params);
  return response.data;
}

// 포트폴리오 북마크 등록
export async function postPortfolioBookmark(portfolioId: number): Promise<{ bookmark_id: number }> {
  // 비회원 오류 이슈가 있었으므로 추가하였음.
  if (!Token.getToken()) throw new Error('로그인이 필요한 요청입니다.');

  const params = `bookmarks/portfolio`;
  const data = {
    portfolio_id: portfolioId,
  };
  const response: AxiosResponse = await Api.post(API_KEY, params, data);
  return response.data;
}

// 포트폴리오 북마크 취소
export async function deletePortfolioBookmark(
  portfolioId: number
): Promise<{ bookmark_id: number }> {
  const params = `bookmarks/portfolio/${portfolioId}`;
  const response: AxiosResponse = await Api.delete(API_KEY, params);
  return response.data;
}

// 코멘트 리스트 불러오기
export async function getComment(
  postType: string,
  projectId: number,
  pageNumber: number
): Promise<{
  message: string;
  data: {
    listLength: number;
    originListLength: number;
    pageSize: number;
    pagenatedComments: CommentType.TypeComment[];
  };
}> {
  const params = `${postType}/${projectId}/comments`;
  const query = `page=${pageNumber}`;
  return await Api.get(API_KEY, params, false, query);
}
export async function postComment<T extends 'project' | 'portfolio'>(
  postType: T,
  data: T extends 'project'
    ? CommentType.TypeProjectCommentPost
    : CommentType.TypePortfolioCommentPost
): Promise<
  T extends 'project' ? CommentType.TypeProjectCommentPost : CommentType.TypePortfolioCommentPost
> {
  const params = `comments/${postType}`;
  return await Api.post(API_KEY, params, data, true);
}
export async function putComment(
  postType: string,
  commentId: number,
  data: CommentType.TypeCommentPut
): Promise<CommentType.TypeCommentPut> {
  const params = `comments/${postType}/${commentId}`;
  return await Api.put(API_KEY, params, data, true);
}
export async function deleteComment<T extends 'project' | 'portfolio'>(
  postType: T,
  commentId: number
): Promise<
  T extends 'project' ? CommentType.TypeProjectCommentPost : CommentType.TypePortfolioCommentPost
> {
  const params = `comments/${postType}/${commentId}`;
  return await Api.delete(API_KEY, params, {}, true);
}

// 모든 프로젝트 리스트 불러오기
export async function getProjects(
  cate: string,
  recruiting: boolean | string,
  keyword: false | string,
  page: number
): Promise<{
  message: string;
  data: { pageSize: number; pagenatedProjects: ProjectType.TypeProjectList[] };
}> {
  const params = `projects`;
  const newKeyword = keyword === '' ? 'false' : keyword;
  const query = `cate=${cate}&recruiting=${recruiting}&keyword=${newKeyword}&page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// 게시물 post
export async function postProject(
  data: FormData
): Promise<{ message: string; data: { project_id: number } }> {
  const params = `projects/recruitment`;
  return await Api.post(API_KEY, params, data, true, true);
}

// 게시물 수정
export async function patchProject(
  data: FormData,
  project_id: number
): Promise<{ message: string; data: { project_id: number } }> {
  const params = `projects/recruitment/${project_id}`;
  return await Api.patch(API_KEY, params, data, true, true);
}

// 유저 프로필 불러오기
export async function getUserProfile(): Promise<{
  message: string;
  data: UserType.TypeUserProfile;
}> {
  const params = `users/profile`;
  return await Api.get(API_KEY, params);
}
// n번 유저 프로필 불러오기
export async function getUserProfileById(userId: number): Promise<{
  message: string;
  data: UserType.TypeUserProfile;
}> {
  const params = `users/profile/${userId}`;
  return await Api.get(API_KEY, params);
}

// stack 전체 데이터 불러오기
export async function getStackList(): Promise<{
  message: string;
  data: StackType.TypeStacks;
}> {
  const params = `stacks`;
  return await Api.get(API_KEY, params, false);
}

// 유저 작성 프로젝트 게시글 불러오기
export async function getUserProjectPosts(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedProjects: ProjectType.TypeUserProjectPosts;
  };
}> {
  const params = `projects/user`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// 유저 작성 포트폴리오 게시글 불러오기
export async function getUserPortfolioPosts(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedPortfolios: PortfolioType.TypeUserPortfolioPosts;
  };
}> {
  const params = `portfolios/user`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// n번 유저 작성 프로젝트 게시글 불러오기
export async function getUserProjectPostsById(
  userId: number,
  page: number
): Promise<{
  message: string;
  data: {
    pagenatedProjects(pagenatedProjects: any): unknown;
    pageSize(pageSize: any): unknown;
    user_projects: ProjectType.TypeUserProjectPosts;
  };
}> {
  const params = `projects/user/${userId}`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}
// n번 유저 작성 포트폴리오 게시글 불러오기
export async function getUserPortfolioPostsById(
  userId: number,
  page: number
): Promise<{
  message: string;
  data: {
    pagenatedProjects(pagenatedPortfolios: any): unknown;
    pageSize(pageSize: any): unknown;
    user_projects: PortfolioType.TypeUserPortfolioPosts;
  };
}> {
  const params = `portfolios/user/${userId}`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// 유저 북마크 프로젝트 게시글 불러오기
export async function getUserProjectBookmarks(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedProjects: ProjectType.TypeUserProjectPosts;
  };
}> {
  const params = `projects/user/bookmark`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// 유저 북마크 포트폴리오 게시글 불러오기
export async function getUserPortfolioBookmarks(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedPortfolios: PortfolioType.TypeUserPortfolioPosts;
  };
}> {
  const params = `portfolios/user/bookmark`;
  const query = `page=${page}`;
  return await Api.get(API_KEY, params, true, query);
}

// 유저 정보 수정하기
export async function updateUserProfile(data: FormData): Promise<UserType.TypeUserProfile> {
  const params = `users/profile`;
  return await Api.patch(API_KEY, params, data, true, true);
}

// 유저 작성 프로젝트 댓글 불러오기
export async function getUserProjectComments(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedComments: CommentType.TypeMypageProjectComments;
  };
}> {
  const params = `comments/project/user?page=${page}`;
  return await Api.get(API_KEY, params);
}

// 유저 작성 포트폴리오 댓글 불러오기
export async function getUserPortfolioComments(page: number): Promise<{
  message: string;
  data: {
    listLength: number;
    pageSize: number;
    pagenatedComments: CommentType.TypeMypagePortfolioComments;
  };
}> {
  const params = `comments/portfolio/user?page=${page}`;
  return await Api.get(API_KEY, params);
}

// 포트폴리오 멤버 선택 시 유저 검색 정보 불러오기
export async function getUsersByEmail(value: string): Promise<{
  message: string;
  data: {
    user_id: number;
    user_email: string;
    user_name: string;
    user_career_goal: string;
    user_img: string;
  }[];
}> {
  const params = `users/members`;
  const query = `keyword=${value}`;
  return await Api.get(API_KEY, params, true, query);
}

// 포트폴리오 상세 정보
export async function getPortfolio(id: string): Promise<any> {
  const params = `portfolios/info/${id}`;
  return await Api.get(API_KEY, params, true);
}
// 포트폴리오 수정
export async function patchPortfolio(id: string, data: FormData): Promise<any> {
  const params = `portfolios/posts/${id}`;
  return await Api.patch(API_KEY, params, data, true, true);
}

// 포트폴리오 포스팅
export async function postPortfolio(data: FormData): Promise<any> {
  const params = `portfolios/posts`;
  return await Api.post(API_KEY, params, data, true, true);
}

// 포트폴리오 멤버 정보 불러오기
export async function getPortfolioUsers(): Promise<{
  data: {
    user_id: number;
    user_email: string;
    user_name: string;
    user_career_goal: string;
    user_img: string;
  }[];
}> {
  const params = `users2.json`;
  return await Api.get(domain, params);
}

// 포트폴리오 리스트 불러오기
export async function getPortfolioList(
  page: number,
  keyword: string = '',
  sort: boolean
): Promise<{ pageSize: number; pagenatedPortfolios: TypePortfolioList[] }> {
  keyword === '' && (keyword = 'false');

  const params = `portfolios?keyword=${keyword}&page=${page}&sort=${sort}`;
  const response: AxiosResponse = await Api.get(API_KEY, params);
  return response.data;
}
// 사용자 비밀번호 변경하기
export async function patchPasswordReset(value: any): Promise<AxiosResponse> {
  const params = `users/password`;
  const data = {
    user_password: value.user_password,
    user_new_password: value.user_new_password,
  };
  const response: AxiosResponse = await Api.patch(API_KEY, params, data);
  return response;
}

// 포트폴리오 삭제
export async function deletePortfolio(portfolioId: number): Promise<AxiosResponse> {
  const params = `portfolios/posts/${portfolioId}`;
  const response: AxiosResponse = await Api.delete(API_KEY, params);
  return response;
}

// 인증코드 전달하여 계정정보 받아오는 카카오 로그인
export async function getKakaoLogin(code: string): Promise<AxiosResponse> {
  const params = `users/kakao?code=${code}`;
  const response: AxiosResponse = await Api.get(API_KEY, params);

  return response;
}

// 모집완료한 게시글 불러오기
export async function getCompletedProject(): Promise<{
  message: string;
  data: {
    listLength: number;
    completedProjects: ProjectType.TypeCompleteProjects[];
  };
}> {
  const params = `projects/recruitment`;
  const query = `status=COMPLETE`;
  return await Api.get(API_KEY, params, true, query);
}

// 회원탈퇴
export async function deleteAccount(password: object): Promise<{ message: string; data: object }> {
  const params = `users/withdrawal`;
  const data = password;
  return await Api.delete(API_KEY, params, data, true);
}
