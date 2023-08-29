import { Header } from '@/components/Header'
import { GlobalNavigation } from '@/components/Navigation/GlobalNavigation'
import { atomAuthProfile, atomUser } from '@/recoils/Global/atoms'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useMatches, useOutlet } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import characterUrl from "@/assets/materials/character.png"
import { useAuthProfile, useUser } from '@/services/queries/Users'
import { ACCESS_TOKEN } from '@/constants/auth'
import { AnimatePresence, motion } from "framer-motion"
import { fadeInOut } from '@/utils/global'

export const BasicLayout = () => {

  const outlet = useOutlet()
  const matches = useMatches()
  const queryClient = useQueryClient()
  const [authProfile, setAuthProfile] = useRecoilState(atomAuthProfile)
  const setUser = useSetRecoilState(atomUser)
  const authProfileQuery = useAuthProfile(localStorage.getItem(ACCESS_TOKEN) ?? undefined)
  const userQuery = useUser(localStorage.getItem(ACCESS_TOKEN) !== null)

  useEffect(() => {
    if (authProfileQuery.isSuccess) {
      setAuthProfile(authProfileQuery.data)
      queryClient.invalidateQueries()
    }
  }, [authProfileQuery.isSuccess, authProfileQuery.data])

  useEffect(() => {
    if (userQuery.isSuccess) setUser(userQuery.data)
  }, [userQuery.isSuccess])

  return (
    <article className="h-full">
      <Header />
      <section className="w-full flex" style={{ height: "calc(100% - 4rem)" }}>
        <GlobalNavigation />
        <AnimatePresence>
          <motion.main
            key={matches[1].pathname} className="w-full h-full bg-gray-100 overflow-y-scroll px-6 py-4"
            variants={fadeInOut}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            {
              authProfile
                ?
                outlet
                :
                <div className="h-full relative ml-10">
                  <img src={characterUrl} className="h-full" />
                  <div className="bg-white rounded-lg p-14 shadow-xl shadow-gray-200 absolute top-20 left-72 text-3xl">
                    ログインしてくれたら、<br/>
                    ぜーぇんぶ見れちゃいますよ？//
                  </div>
                </div>
            }
          </motion.main>
        </AnimatePresence>
      </section>
    </article>
  )
}