interface User {
  user_id: number;
  user_email: string;
  user_name: string;
  user_password: string;
  user_career_goal: string;
  user_stacks: {
    stackList: string[];
  };
  user_introduction: string;
  user_img: string;
}

export type TypeUserProfile = Pick<
  User,
  'user_id' | 'user_name' | 'user_career_goal' | 'user_stacks' | 'user_introduction' | 'user_img'
>;

export type TypeUserStack = Pick<User, 'user_stacks'>;

export type TypeUser = Pick<
  User,
  | 'user_id'
  | 'user_email'
  | 'user_name'
  | 'user_password'
  | 'user_career_goal'
  | 'user_stacks'
  | 'user_introduction'
  | 'user_img'
>;
