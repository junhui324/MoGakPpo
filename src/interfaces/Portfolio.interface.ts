interface Portfolio {
  portfolio_id: number;
  portfolio_title: string;
  portfolio_summary: string;
  portfolio_thumbnail: string;
  portfolio_github: string;
  portfolio_stacks: {
    stackList: string[];
  };
  participated_members: {
    user_id: number;
    user_name: string;
    user_email: string;
    user_career_goal: string;
    user_img: string;
  }[];
  portfolio_description: string;
  portfolio_img: string | null;
  portfolio_bookmark_count: number;
  portfolio_comments_count: number;
  portfolio_views_count: number;
  portfolio_created_at: string;
  user_id: number;
  user_name: string;
  user_introduction: string;
  user_img: string;
  portfolio_bookmark_users: { user_id: number; user_name: string; user_img: string }[];
  is_bookmarked: boolean;
}

export type TypePortfolio = Portfolio;

export type TypePortfolioList = Pick<
  Portfolio,
  | 'portfolio_id'
  | 'portfolio_title'
  | 'portfolio_summary'
  | 'portfolio_thumbnail'
  | 'portfolio_stacks'
  | 'portfolio_bookmark_count'
  | 'portfolio_comments_count'
  | 'portfolio_views_count'
  | 'portfolio_created_at'
> & {
  is_bookmarked?: boolean;
};

export type TypePortfolioDetail = Pick<
  Portfolio,
  | 'portfolio_id'
  | 'portfolio_title'
  | 'portfolio_summary'
  | 'portfolio_thumbnail'
  | 'portfolio_stacks'
  | 'portfolio_bookmark_count'
  | 'portfolio_comments_count'
  | 'portfolio_views_count'
  | 'portfolio_created_at'
  | 'is_bookmarked'
  | 'portfolio_bookmark_users'
  | 'portfolio_description'
  | 'portfolio_github'
  | 'portfolio_img'
  | 'user_id'
  | 'user_img'
  | 'user_introduction'
  | 'user_name'
  | 'participated_members'
>;
export type TypeUserPortfolioPosts = TypePortfolioList[];
