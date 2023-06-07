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
  refreshToken?: boolean; // 추가
}

async function request<T>({
  endpoint,
  method,
  params = '',
  query = '',
  data,
  requiresToken = true,
  refreshToken = true, // 추가
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
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 오류를 받으면 오류 상태 코드를 보냅니다.
      console.log(error);
      const { status } = error.response;

      //
      if (status === 401) {
        refreshToken &&
          (headers.refreshToken = `${Token.getRefreshToken() ? Token.getRefreshToken() : ''}`);

        const refreshRes: AxiosResponse = await axios.request<T>({
          url: apiUrl,
          method,
          headers,
          data,
          withCredentials: true,
        });

        const resData = refreshRes.data.data;
        const accessToken = resData.newAccessToken;
        cookie.save('accessToken', accessToken, {
          path: '/',
        });

        requiresToken &&
          (headers.Authorization = `Bearer ${Token.getToken() ? Token.getToken() : ''}`);

        const originRes = await axios.request<T>({
          url: apiUrl,
          method,
          headers,
          data,
          withCredentials: true,
        });

        return originRes.data;
      }

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
