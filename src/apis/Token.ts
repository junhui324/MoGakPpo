// 토큰을 쿠키에 저장합니다.
function setToken(tokenValue: string) {
  document.cookie = `token=${tokenValue}; path=/`;
}

// 쿠키에 저장한 토큰 값을 반환합니다.
function getToken(): string | null {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    return key === 'token' ? value : null;
  }
  return null;
}

// 쿠키에 저장된 토큰을 삭제합니다.
function removeToken(): void {
  document.cookie = 'token=; expires=Sun, 01 Jan 2023 00:00:00 UTC; path=/;';
}

export { setToken, getToken, removeToken };
