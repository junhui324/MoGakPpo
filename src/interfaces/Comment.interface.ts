interface Comment {
  comment_id: number;
  commenter_id: number;
  commenter_name: string;
  commenter_img: string;
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
