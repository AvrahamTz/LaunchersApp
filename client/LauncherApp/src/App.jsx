import {BrowserRouter,Routes,Route} from "react-router"
import HomePage from "./pages/HomePage"
import LauncherDetailsPage from "./pages/LauncherDetailsPage"
import AddLauncherPage from "./pages/AddLauncherPage"
import "./styles/styles.css"
function App() {



return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path ="/adding" element ={<AddLauncherPage/>}></Route>
      <Route path = "/home" element = {<HomePage/>} ></Route>
      <Route path = "/launcher/:id" element = {<LauncherDetailsPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
