interface Comment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
  status?: number;
}

// 스키마 버전 댓글 인터페이스 의논 필요함!!!
interface MyPageComment {
  comment_id: number;
  project_id: number;
  user_id: number;
  comment_content: string;
  comment_created_at: string;
}

export type TypeComment = Pick<
  Comment,
  'comment_id' | 'user_id' | 'user_name' | 'user_img' | 'comment_content' | 'comment_created_at'
>;

export type TypeCommentPost = Pick<Comment, 'comment_content' | 'status'>;
export type TypeUserComments = { comment: MyPageComment }[];
