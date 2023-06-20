interface Comment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  isDeleted: boolean;
  replies: Comment[];
}

export interface ProjectComment extends Comment {
  project_id: number;
}
interface PortfolioComment extends Comment {
  portfolio_id: number;
}

interface MyPageProjectComment extends ProjectComment {
  project_title: string;
}

interface MyPagePortfolioComment extends PortfolioComment {
  portfolio_title: string;
}

export type TypeComment = Pick<
  Comment,
  | 'comment_id'
  | 'user_id'
  | 'user_name'
  | 'user_img'
  | 'comment_content'
  | 'comment_created_at'
  | 'isDeleted'
  | 'replies'
>;

export type TypeMypageProjectComment = Pick<
  MyPageProjectComment,
  'comment_id' | 'project_id' | 'project_title' | 'comment_content' | 'comment_created_at'
>;
export type TypeMypagePortfolioComment = Pick<
  MyPagePortfolioComment,
  'comment_id' | 'portfolio_id' | 'portfolio_title' | 'comment_content' | 'comment_created_at'
>;

export type TypeProjectCommentPost = Pick<ProjectComment, 'project_id' | 'comment_content'>;
export type TypePortfolioCommentPost = Pick<PortfolioComment, 'portfolio_id' | 'comment_content'>;
export type TypeCommentPut = Pick<Comment, 'comment_content'>;

export type TypeMypageProjectComments = TypeMypageProjectComment[];
export type TypeMypagePortfolioComments = TypeMypagePortfolioComment[];
