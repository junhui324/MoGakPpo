//@ts-ignore
import cookie from 'react-cookies';

export function isLoggedIn() {
  const userToken = cookie.load('accessToken');
  if (userToken) {
    return true;
  }
  return false;
}

export {};
