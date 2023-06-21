import { atom } from 'recoil';
import { TypePortfolio } from '../interfaces/Portfolio.interface';
import { TypeCompleteProjects } from '../interfaces/Project.interface';

export const portfolioState = atom<TypePortfolio>({
  key: 'portfolioState',
  default: {
    is_bookmarked: false,
    portfolio_id: 0,
    portfolio_title: '',
    portfolio_summary: '',
    portfolio_thumbnail: '',
    portfolio_github: '',
    portfolio_stacks: { stackList: [] as string[] },
    participated_members: [],
    portfolio_description: '',
    portfolio_img: '',
    portfolio_bookmark_count: 0,
    portfolio_comments_count: 0,
    portfolio_views_count: 0,
    portfolio_created_at: '',
    portfolio_bookmark_users: [],
    user_id: 0,
    user_name: '',
    user_introduction: '',
    user_img: '',
  },
});

export const selectedPostTitleState = atom({
  key: 'selectedPostTitleState',
  default: {
    id: 0,
    title: '',
  },
});

export const completeListState = atom<TypeCompleteProjects[]>({
  key: 'completeListState',
  default: [],
});
