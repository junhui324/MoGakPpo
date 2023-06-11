interface Portfolio {
  portfolio_id: number;
  portfolio_title: string;
  portfolio_summary: string;
  portfolio_thumbnail: string | null;
  portfolio_stacks: {
    stackList: string[];
  };
  portfolio_bookmark_count: number;
  portfolio_comments_count: number;
  portfolio_views_count: number;
  portfolio_created_at: string;
  is_bookmarked: boolean;
}

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
  | 'is_bookmarked'
>;

export type TypeUserPortfolioPosts = TypePortfolioList[];