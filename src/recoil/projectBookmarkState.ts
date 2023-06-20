import { atom } from 'recoil';

export const projectBookmarkAtom = atom<number[]>({
  key: 'projectBookmark',
  default: [],
});
