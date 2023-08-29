import { useAuthLogin } from "@/services/mutations/Auth"
import { ACCESS_TOKEN } from '@/constants/auth'
import { useAuthProfile } from "@/services/queries/Users"
import { useRecoilState, useRecoilValue } from "recoil"
import { atomAuthProfile, atomUser } from "@/recoils/Global/atoms"
import { useQueryClient } from "@tanstack/react-query"
import { useToasty } from "@/utils/use_toasty"
import { useCreateUser } from "@/services/mutations/User/create"
import { useEffect, useState } from "react"

export const useSign = () => {
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const loginMutation = useAuthLogin()
  const createMutation = useCreateUser()
  const authProfileQuery = useAuthProfile(accessToken)
  const [authProfile, setAuthProfile] = useRecoilState(atomAuthProfile)
  const user = useRecoilValue(atomUser)
  const { toast } = useToasty()

  const onLogin = async (email: string, password: string) => {
    setSubmitting(true)
    loginMutation.mutate({ email, password })
  }

  const onRegister = async (email: string, password: string, nickname: string) => {
    setSubmitting(true)
    createMutation.mutate({ email, password, nickname })
  }

  const onLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    queryClient.invalidateQueries()
  }

  useEffect(() => {
    if (createMutation.isError) {
      setSubmitting(false)
    }
    else if (createMutation.isSuccess && createMutation.data) {
      onLogin(createMutation.data.email, createMutation.data.password)
    }
  }, [createMutation.isSuccess, createMutation.isError])

  useEffect(() => {
    if (loginMutation.isError) {
      setSubmitting(false)
    }
    else if (loginMutation.isSuccess && loginMutation.data) {
      window.localStorage.setItem(ACCESS_TOKEN, loginMutation.data.accessToken);
      setAccessToken(loginMutation.data.accessToken)
      setSubmitting(false)
      setIsShowLoginModal(false)
      setIsShowRegisterModal(false)
      if (createMutation.data) {
        toast("いらっしゃいませ🥰", { type: 'success' })
      } else {
        toast("おかえりなさいませ🥰", { type: 'success' })
      }
    }
  }, [loginMutation.isSuccess, loginMutation.isError])

  useEffect(() => {
    if (authProfileQuery.isSuccess) {
      setAuthProfile(authProfileQuery.data ?? null)
    }
  }, [authProfileQuery.isSuccess, authProfileQuery.isFetched, authProfileQuery.data])

  return {
    user,
    isShowRegisterModal,
    isShowLoginModal,
    submitting,
    authProfile,
    setIsShowRegisterModal,
    setIsShowLoginModal,
    onRegister,
    onLogin,
    onLogout,
  }
}