import { atom } from 'recoil';
import { TypeProjectList } from '../interfaces/Project.interface';

export interface ProjectListState {
  isLoading: boolean;
  projectList: TypeProjectList[];
  pageCount: number;
  pageSize: number;
  moreData: boolean;
  selectedCategory: string;
  keywordValue: string;
  isSearched: boolean;
  recruitingFilter: string;
  isFirstFetch: boolean;
  isRefetch: boolean;
}

export const projectListAtom = atom<ProjectListState>({
  key: 'projectListState',
  default: {
    isLoading: true,
    projectList: [],
    pageCount: 1,
    pageSize: 0,
    moreData: true,
    selectedCategory: 'all',
    keywordValue: '',
    isSearched: false,
    recruitingFilter: 'all',
    isFirstFetch: true,
    isRefetch: false,
  },
});
