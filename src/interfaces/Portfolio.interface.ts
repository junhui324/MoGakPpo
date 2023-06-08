interface Portfolio {
  portfolio_id: number;
  img: string | null;
  title: string;
  summary: string;
  stack: { stackList: string[] };
  views: number;
  comments: number;
  bookmarks: number;
  is_bookmarked: boolean;
}

export type TypePortfolioList = Pick<
  Portfolio,
  | 'portfolio_id'
  | 'img'
  | 'title'
  | 'summary'
  | 'stack'
  | 'views'
  | 'comments'
  | 'bookmarks'
  | 'is_bookmarked'
>;
