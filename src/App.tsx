import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Flashcard } from "./features/Flashcard";
import { Home } from "./features/Home";
import { BasicLayout } from "./components/Layout";
import { Words } from "./features/Words";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'

const App = () => {

  const queryClient = new QueryClient()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path="flashcard" element={<Flashcard />} />
        <Route path="words" element={<Words />} />
        {/* ... etc. */}
      </Route>
    )
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
