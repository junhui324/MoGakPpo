import { LoginData } from "@/interfaces/Login.interface";
import { atom } from "recoil";

export const loginAtom = atom<LoginData>({
  key:"login",
  default:{
    user_id:"",
    user_name:"",
    user_img:"",
  }
});