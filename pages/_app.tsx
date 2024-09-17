import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient=new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className}>
   <QueryClientProvider client={queryClient}>
   < GoogleOAuthProvider clientId="219597734792-9hclnab5tb8f9c3rl45p93odj382s5lg.apps.googleusercontent.com">
  
    <Component {...pageProps} />
    <Toaster/>
    <ReactQueryDevtools/>
   </GoogleOAuthProvider>

   </QueryClientProvider>
  </div>
  );
}
