interface Comment {
  comment_id: number;
  user_id: number;
  user_name: string;
  user_img: string;
  comment_content: string;
  comment_created_at: string;
}
export type TypeComment = Pick<
  Comment,
  'comment_id' | 'user_id' | 'user_name' | 'user_img' | 'comment_content' | 'comment_created_at'
>;
