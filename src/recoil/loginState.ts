import { LoginData } from "../interfaces/Login.interface";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export const loginAtom = atom<LoginData>({
  key:"loginAtom",
  default:{
    user_id:"",
    user_name:"",
    user_img:"",
    user_career_goal:"",
    user_stacks: {
      stackList: []
    },
    user_introduction:"",
  },
  effects_UNSTABLE:[persistAtom],
});