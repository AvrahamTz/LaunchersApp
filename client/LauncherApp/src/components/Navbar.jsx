import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../store/authStore"

export default function Navbar() {
    const user =useAuthStore((s) => s.user)
    const logout =useAuthStore((s) => s.logout)
    const navigate = useNavigate()
  return (
    <div>
        <Link className="nav" to={"/"}>Home</Link>
        {!user && <Link className="nav" to={"/login"}>Login</Link >}
        {user?.user_type === "admin" && <Link className="nav" to={"/register"}>Register</Link>}
        {user?.user_type === "admin" || "intel" &&<Link className="nav" to={"/add"}>addALauncher</Link>}
        {user?.user_type === "airMilatry" && <Link className="nav" to={"/destroyed"}>Destroyed</Link>}
        {user && 
        <>
        <button onClick={alert(`${user.username} ${user.user_type}`)}>MyDetails</button>
        <button onClick={() =>{logout(); navigate("/login")}}>Logout</button>
        
        </>}
    </div>
  )
}
