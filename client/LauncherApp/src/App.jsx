import {BrowserRouter,Route} from "react-router"
import HomePage from "./pages/HomePage"
import LauncherDetailsPage from "./pages/LauncherDetailsPage"
function App() {



return (
    <>
    <BrowserRouter>
    <Route path = "/home" element = {<HomePage/>} ></Route>
    <Route path = "/launcher/:id" element = {<LauncherDetailsPage/>}></Route>
    </BrowserRouter>
    </>
  )
}

export default App
