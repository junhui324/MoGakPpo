// import { atom, selector } from 'recoil';
// import Cookies from 'js-cookie';

// const getCookieToken = () => {
// 	return Cookies.get('token');
// };

// export const userTokenState = atom({
// 	key: 'userToken',
// 	default: getCookieToken() || '',
// });

import { atom } from 'recoil';

export const userTokenState = atom<string | null>({
  key: 'userTokenState',
  default: '',
});

export {};
