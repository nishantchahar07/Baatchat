import { useEffect } from "react";
import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router"

function App() {
  const [data , setData] = useState([]);
  const [isLoading , setIsLoading ] = useState(false);
  const [error , setError] = useState(null);

  useEffect(() => {
    const getData = async () => {}});



   return (
   <>
   <div claddName='h-screen' data-theme="lemonade">
//TODO : read doc about react query tanstack query 
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
