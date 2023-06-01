interface Comment {
  comment_id: number;
  commenter_id: number;
  commenter_name: string;
  commenter_img: string;
  comment_content: string;
  comment_created_at: string;
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
  | 'comment_id'
  | 'commenter_id'
  | 'commenter_name'
  | 'commenter_img'
  | 'comment_content'
  | 'comment_created_at'
>;

export type TypeUserComments = { comment: MyPageComment }[];