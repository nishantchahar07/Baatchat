
import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";      
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import { useQuery } from "@tanstack/react-query";
import axiosInstance  from "../src/lib/axios";


function App() {
 //tanstack query -->  give functionality to fetch data from server and cache it
const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res= await axiosInstance.get('/auth/me');
      return res.data;
    },
    retry: false, // Disable retry on failure
  });

  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("error", error);
    

   return (
   <>
   <div className='h-screen' data-theme="lemonade">

    {/* read tanstack query  */}
    
    <Routes>
      <Route path ="/" element={<HomePage/>} />
      <Route path ="/signup" element={<SignUpPage/>} />
      <Route path ="/login" element={<LoginPage/>} />
      <Route path ="/notification" element={<NotificationPage/>} />
      <Route path ="/call" element={<CallPage/>} />
      <Route path ="/chat" element={<ChatPage/>} />
      <Route path ="/onboarding" element={<OnboardingPage/>} />
    </Routes>

    <Toaster/>
    
   </div>
   
   </>
  )
}

export default App
