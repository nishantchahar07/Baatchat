
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router"
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
const { data : authData , isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res= await axiosInstance.get('/auth/me');
      return res.data;
    },
    retry: false, // Disable retry on failure
  });

  const authUser = authData?.user;
 
    

   return (
   <>
   <div className='h-screen' data-theme="lemonade">

    {/* read tanstack query  */}
    
    <Routes>
      <Route path ="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
      <Route path ="/signup" element={ !authUser ?  <SignUpPage/> : <Navigate to="/"/>} />
      <Route path ="/login" element={ !authUser ? <LoginPage/> : <Navigate to="/"/>} />
      <Route path ="/notification" element={authUser ? <NotificationPage/> : <Navigate to="/login"/>} />
      <Route path ="/call" element={authUser ? <CallPage/> : <Navigate to="/login"/>} />
      <Route path ="/chat" element={authUser ? <ChatPage/> : <Navigate to="/login"/>} />
      <Route path ="/onboarding" element={authUser ?  <OnboardingPage/> : <Navigate to="/login"/>} />
    </Routes>

    <Toaster/>
    
   </div>
   
   </>
  )
}

export default App
