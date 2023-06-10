// 1차 댓글 인터페이스 - 없어질 예정
interface Comment {
  data?: any;
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  status?: number;
  project_id: number;
}

// 2차 댓글 인터페이스 (프로젝트, 포트폴리오 분리)
interface ProjectComment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  status?: number;
  project_id: number;
}

interface PortfolioComment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  status?: number;
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
  | 'data'
>;

export type TypeMypageProjectComment = Pick<
  MyPageProjectComment,
  'comment_id' | 'project_id' | 'project_title' | 'comment_content' | 'comment_created_at'
>;
export type TypeMypagePortfolioComment = Pick<
  MyPagePortfolioComment,
  'comment_id' | 'portfolio_id' | 'portfolio_title' | 'comment_content' | 'comment_created_at'
>;

export type TypeCommentPost = Pick<Comment, 'project_id' | 'comment_content' | 'status'>;
export type TypeCommentPut = Pick<Comment, 'comment_content' | 'status'>;
export type TypeMypageProjectComments = TypeMypageProjectComment[];
export type TypeMypagePortfolioComments = TypeMypagePortfolioComment[];
