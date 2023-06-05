import cookie from 'react-cookies';

// 토큰을 쿠키에 저장합니다.
function setToken(tokenValue: string) {
  cookie.save('accessToken', tokenValue, { path: '/' });
}

// 쿠키에 저장한 토큰 값을 반환합니다.
function getToken(): string | null {
  return cookie.load('accessToken');
}

// 쿠키에 저장된 토큰을 삭제합니다.
function removeToken(): void {
  cookie.remove('accessToken', { path: '/' });
}

export { setToken, getToken, removeToken };
