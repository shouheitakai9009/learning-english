import { IAuthUser } from "@/services/queries/Users";
import { User } from "@/types/api";
import { atom } from "recoil";

export const atomAuthProfile = atom<IAuthUser | null>({
  key: 'auth-profile',
  default: null
})

export const atomUser = atom<User | null>({
  key: 'user',
  default: null
})