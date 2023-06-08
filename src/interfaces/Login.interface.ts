export interface LoginData{
  user_id:string,
  user_name:string,
  user_img:string,
  user_career_goal: string,
  user_stacks: {
    stackList: string[]
  },
  user_introduction: string;

};
