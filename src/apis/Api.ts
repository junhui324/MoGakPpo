import axios, { AxiosResponse } from 'axios';
import * as Token from './Token';
import cookie from 'react-cookies';

interface RequestParams<T> {
  endpoint: string | undefined;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: string;
  query?: string;
  data?: any;
  requiresToken?: boolean;
}

async function request<T>({
  endpoint,
  method,
  params = '',
  query = '',
  data,
  requiresToken = true,
}: RequestParams<T>): Promise<T> {
  const apiUrl = params ? `${endpoint}/${params}${query ? `?${query}` : ''}` : endpoint;
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  requiresToken && (headers.Authorization = `Bearer ${Token.getToken() ? Token.getToken() : ''}`);

  try {
    const response = await axios.request<T>({
      url: apiUrl,
      method,
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 오류를 받으면 오류 상태 코드를 보냅니다.
      const { status } = error.response;

      //
      if (status === 401) {
        try {
          // 1. 엑세스랑 리프레시 보내기
          const refreshToken = Token.getRefreshToken();
          refreshToken && (headers['X-Refresh-Token'] = refreshToken);

          const refreshRes: AxiosResponse = await axios.request<T>({
            url: apiUrl,
            method,
            headers,
            data,
          });

          // 2. 새로운 엑세스 받기
          const resData = refreshRes.data.data;
          const accessToken = resData.newAccessToken;

          // 3. 현재 쿠키에 저장돼있는 엑세스 지우기
          Token.removeToken();

          // 4. 새로운 엑세스 쿠키에 넣기
          Token.setToken(accessToken);

          // 5. 새로운 엑세스로 재요청 보내기
          requiresToken &&
            (headers.Authorization = `Bearer ${Token.getToken() ? Token.getToken() : ''}`);

          const originResponse = await axios.request<T>({
            url: apiUrl,
            method,
            headers,
            data,
            withCredentials: true,
          });

          return originResponse.data;
        } catch (error) {
          console.log('리프레시 보내는데 에러발생', error);
        }
      }

      console.log(error);
      throw new Error(status);
      //
    } else {
      throw new Error('요청이 실패하였습니다.');
    }
  }
}

const get = <T>(
  endpoint: string | undefined,
  params = '',
  requiresToken = true,
  query = ''
): Promise<T> => request<T>({ endpoint, method: 'GET', params, requiresToken, query });

const post = <T>(
  endpoint: string | undefined,
  params = '',
  data: any,
  requiresToken = true
): Promise<T> => request<T>({ endpoint, method: 'POST', params, data, requiresToken });

const put = <T>(
  endpoint: string | undefined,
  params = '',
  data: any,
  requiresToken = true
): Promise<T> => request<T>({ endpoint, method: 'PUT', params, data, requiresToken });

const del = <T>(
  endpoint: string | undefined,
  params = '',
  data: any = {},
  requiresToken = true
): Promise<T> => request<T>({ endpoint, method: 'DELETE', params, data, requiresToken });

const patch = <T>(
  endpoint: string | undefined,
  params = '',
  data: any,
  requiresToken = true
): Promise<T> => request<T>({ endpoint, method: 'PATCH', params, data, requiresToken });

export { get, post, put, del as delete, patch };
