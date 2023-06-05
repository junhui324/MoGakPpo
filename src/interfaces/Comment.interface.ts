interface Comment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  status?: number;
  project_id: number;
}
interface MyPageComment extends Comment {
  project_title: string;
}

export type TypeComment = Pick<
  Comment,
  'comment_id' | 'user_id' | 'user_name' | 'user_img' | 'comment_content' | 'comment_created_at'
>;

export type TypeMypageComment = Pick<
  MyPageComment,
  'comment_id' | 'project_id' | 'project_title' | 'comment_content' | 'comment_created_at'
>;

export type TypeCommentPost = Pick<Comment, 'project_id' | 'comment_content' | 'status'>;
export type TypeMypageComments = TypeMypageComment[];
