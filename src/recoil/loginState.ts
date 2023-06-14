import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LoginData } from '../interfaces/Login.interface';
import DefaultUserImg from '../assets/DefaultUser.png';

const { persistAtom } = recoilPersist();

export const loginAtom = atom<LoginData>({
  key: 'loginAtom',
  default: {
    user_id: '',
    user_name: '',
    user_img: DefaultUserImg,
    user_career_goal: '',
    user_stacks: {
      stackList: [],
    },
    user_introduction: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom({
  key:'isLoginAtom',
  default:false,
});

export const userStackListState = atom<string[]>({
  key: 'userStackListState',
  default: [],
});
