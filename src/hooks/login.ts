//@ts-ignore
import cookie from 'react-cookies';

const userToken = cookie.load('accessToken');

export function getIsLoggedIn() {
  console.log(userToken);
  if (userToken) {
    return true;
  }
  return false;
}

export function logout() {
  cookie.remove('accessToken');
}
