import { Header } from '@/components/Header'
import { GlobalNavigation } from '@/components/Navigation/GlobalNavigation'
import { atomAuthProfile } from '@/recoils/Global/atoms'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export const BasicLayout = () => {

  const authProfile = useRecoilValue(atomAuthProfile)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (authProfile) {
      queryClient.invalidateQueries();
    }
  }, [authProfile])

  return (
    <article className="h-full">
      <Header />
      <section className="w-full flex" style={{ height: "calc(100% - 4rem)" }}>
        <GlobalNavigation />
        <main className="w-full h-full bg-gray-100 overflow-y-scroll px-6 py-4">
          <Outlet />
        </main>
      </section>
    </article>
  )
}