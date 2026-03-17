import {BrowserRouter,Routes,Route} from "react-router"
import HomePage from "./pages/HomePage"
import LauncherDetailsPage from "./pages/LauncherDetailsPage"
import AddLauncherPage from "./pages/AddLauncherPage"
import "./styles/styles.css"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import ProtectedRoutes from "./components/protectedRoutes"
import RegisterPage from "./pages/RegisterPage"
import DestroyedPage from "./pages/DestroyedPage"
DestroyedPage
function App() {
    const setUser = useAuthStore(s => s.setUser);
    const token = useAuthStore(s => s.token);
  useEffect(()=>{
    const getuser = async () =>{
      try {
            const res = await fetch( "http://localhost:3000/api/auth/getUser",{
                headers:{Authorization: `Bearer ${token}`}}
            )
            const data =await res.json()
            if(res.ok){
              setUser(data)
            }
            if (token){
              getuser()
            }
        } catch (error) {
            console.error(error)
        }
    }
   },[])


return (
    <>
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path ="/login" element ={<LoginPage/>}></Route>
      <Route path ="/add" element ={
        <ProtectedRoutes allowed={["admin","intel"]}>
        <AddLauncherPage/>
        </ProtectedRoutes>}>
        </Route>
      <Route path = "/" element = {
         <ProtectedRoutes>
        <HomePage/>
        </ProtectedRoutes>}>
        </Route>
      <Route path = "/launcher/:id" element = {
        <ProtectedRoutes allowed={["admin","intel"]}>
        <LauncherDetailsPage/>
        </ProtectedRoutes>}>
        </Route>
        <Route path = "/register" element = {
        <ProtectedRoutes allowed={["admin"]}>
        <RegisterPage/>
        </ProtectedRoutes>}>
        </Route>
         <Route path = "/destroyed" element = {
        <ProtectedRoutes allowed={["airMilatry"]}>
        <DestroyedPage/>
        </ProtectedRoutes>}>
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
