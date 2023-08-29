import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { RandomFlash } from "./features/Flashcard/RandomFlash";
import { Home } from "./features/Home";
import { BasicLayout } from "./components/Layout";
import { Words } from "./features/Words";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { PracticeUnderstand } from "./features/Practice/Understand/components";

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path="practice/understand" element={<PracticeUnderstand />} />
        <Route path="flashcard/randomflash" element={<RandomFlash />} />
        <Route path="words" element={<Words />} />
        {/* ... etc. */}
      </Route>
    )
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
