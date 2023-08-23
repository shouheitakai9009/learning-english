import { Link } from "react-router-dom"
import { TextField } from "../TextField"
import { useEffect, useState } from "react"
import { Button } from "../Button"
import { RegisterModal } from "@/features/Modal/RegisterModal"
import { LoginModal } from "@/features/Modal/LoginModal"
import { useAuthLogin } from "@/services/mutations/Auth"
import { ACCESS_TOKEN } from '@/constants/auth'
import { useAuthProfile } from "@/services/queries/Users"
import { useSetRecoilState } from "recoil"
import { atomAuthProfile } from "@/recoils/Global/atoms"

export const Header = () => {

  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false)
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const loginMutation = useAuthLogin()
  const authProfileQuery = useAuthProfile(accessToken)
  const setAuthProfile = useSetRecoilState(atomAuthProfile)

  const onLogin = async (email: string, password: string) => {
    loginMutation.mutate({ email, password })
  }

  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data) {
      console.log(loginMutation.data.data.accessToken);
      window.localStorage.setItem(ACCESS_TOKEN, loginMutation.data.data.accessToken);
      setAccessToken(loginMutation.data.data.accessToken)
    }
  }, [loginMutation.isSuccess])

  useEffect(() => {
    if (authProfileQuery.isSuccess) {
      setAuthProfile(authProfileQuery.data ?? null)
    }
  }, [authProfileQuery.isSuccess])

  return (
    <header className="h-16 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="h-full flex justify-between items-center px-10">
        <div className="w-full flex items-center justify-between h-full">
          <Link to="/">
            <p className="flex items-center mr-20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-12 h-12 fill-orange-500 mr-1 stroke-slate-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              <div>
                <p className="text-white font-bold text-lg">Learning English Library</p>
                <p className="text-white text-xs bg-orange-500 text-center rounded-sm px-1">英語のすべてが学べる書庫</p>
              </div>
            </p>
          </Link>
          <TextField
            placeholder='調べたい英単語や和訳を入力しよう！  例）書庫'
            className="rounded-md h-12 pl-4"
            style={{ width: '40rem' }}
            rightComponent={
              <Button className="absolute right-1 top-1 w-24">Search</Button>
            }
          />
          <section>
            <button
              className="text-white text-lg font-bold hover:underline mr-6"
              onClick={() => setIsShowRegisterModal(true)}
            >
              Sign up
            </button>
            <button
              className="text-white text-lg font-bold hover:underline"
              onClick={() => setIsShowLoginModal(true)}
            >
              Sign in
            </button>
          </section>
        </div>
      </div>
      <RegisterModal
        isOpen={isShowRegisterModal}
        onClose={() => setIsShowRegisterModal(false)}
        onRegister={() => console.log('test')}
      />
      <LoginModal
        isOpen={isShowLoginModal}
        onClose={() => setIsShowLoginModal(false)}
        onLogin={onLogin}
      />
    </header>
  )
}