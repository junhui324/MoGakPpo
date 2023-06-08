import { atom } from "recoil";
import { LoginData } from "../interfaces/Login.interface";
import DefaultUserImg from '../assets/DefaultUser.png';

export const loginAtom = atom<LoginData>({
  key:"loginAtom",
  default:{
    user_id:"",
    user_name:"",
    user_img: DefaultUserImg,
    user_career_goal:"",
    user_stacks: {
      stackList: []
    },
    user_introduction:"",
  }
});