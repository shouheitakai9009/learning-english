import { IAuthUser } from "@/services/queries/Users";
import { atom } from "recoil";

export const atomAuthProfile = atom<IAuthUser | null>({
  key: 'auth-profile',
  default: null
})