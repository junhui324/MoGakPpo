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
  refreshToken?:boolean; // 추가
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
      // withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 오류를 받으면 오류 상태 코드를 보냅니다.
      console.log(error);
      const { status } = error.response;

      //
      if (status === 401) {
        // refreshToken &&
        //   (headers.cookie = `${Token.getRefreshToken() ? Token.getRefreshToken() : ''}`);

        // const headers = {
        //   // Athurization: `Bearer ${Token.getToken() ? Token.getToken() : ''}`,
        //   cookie: `${Token.getRefreshToken() ? Token.getRefreshToken() : ''}`,
        // };

        console.log(headers);

        // 1. 엑세스랑 리프레시 보내기
        try {
          // const refreshRes: AxiosResponse = await axios.post(
          //   `${apiUrl}`,
          //   {
          //     refreshToken: Token.getRefreshToken(),
          //   },
          //   headers
          // );

          headers['X-Refresh-Token'] = Token.getRefreshToken() as string;
          // headers.cookie = Token.getRefreshToken();
          // Token.getRefreshToken() && (headers.cookie = Token.getRefreshToken());
          console.log(headers);

          const refreshRes: AxiosResponse = await axios.request<T>({
            url: apiUrl,
            method,
            headers,
            data,
            withCredentials: true,
          });

          // 2. 새로운 엑세스 받기
          const resData = refreshRes.data.data;
          console.log('resData', resData);
          const accessToken = resData.newAccessToken;

          // 3. 현재 쿠키에 저장돼있는 엑세스 지우기
          cookie.remove('accessToken', { path: '/' });

          // 4. 새로운 엑세스 쿠키에 넣기
          cookie.save('accessToken', accessToken, {
            path: '/',
          });

          // 5. 새로운 엑세스로 재요청 보내기
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
        } catch (error) {
          console.log('리프레시 보내는데 에러발생', error);
        }
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
