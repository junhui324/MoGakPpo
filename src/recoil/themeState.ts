import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'theme',
  storage: localStorage,
});

export const themeAtom = atom({
  key: 'dark-mode',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
