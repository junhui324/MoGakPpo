import { atom } from 'recoil';
import { TypeProjectPost } from '../interfaces/Project.interface';

export const projectState = atom<TypeProjectPost>({
  key: 'projectState',
  default: {
    project_type: '',
    project_title: '',
    project_summary: '',
    project_recruitment_roles: { roleList: [] as string[] },
    project_required_stacks: { stackList: [] as string[] },
    project_goal: '',
    project_participation_time: '',
    project_introduction: '',
    project_img: null,
  },
});

export const stackListState = atom<string[]>({
  key: 'stackListState',
  default: [],
});

export const classificationState = atom<string>({
  key: 'classificationState',
  default: '',
});

export const projectIdState = atom<number>({
  key: 'projectIdState',
  default: 0,
});

export const modifyButtonClickState = atom<boolean>({
  key: 'modifyButtonClickState',
  default: false,
});
