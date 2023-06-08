import { atom } from 'recoil';
import { TypeProject } from '../interfaces/Project.interface';

export const portfolioState = atom<TypeProject>({
  key: 'portfolioState',
  default: {
    is_bookmarked: false,
    project_id: 0,
    project_type: '',
    project_recruitment_status: '',
    project_title: '',
    project_summary: '',
    project_recruitment_roles: { roleList: [] as string[] },
    project_required_stacks: { stackList: [] as string[] },
    project_goal: '',
    project_participation_time: '',
    project_introduction: '',
    project_img: null,
    project_bookmark_count: 0,
    project_comments_count: 0,
    project_views_count: 0,
    project_created_at: '',
    project_bookmark_users: [],
    user_id: 0,
    user_name: '',
    user_introduction: '',
    user_img: '',
  },
});
