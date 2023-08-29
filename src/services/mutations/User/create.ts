import { User } from "@/types/api"
import { useMutationWrapper } from "@/services/mutations/useMutationWrapper"

export interface IRequestCreateUser extends Pick<User, "email" | "password" | "nickname"> {}

export const useCreateUser = () => {
  const mutation = useMutationWrapper<User, unknown, IRequestCreateUser>({ url: "/users/create" })
  return mutation
}
