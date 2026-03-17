import { Navigate } from "react-router"
import { useAuthStore } from "../store/authStore"


export default function ProtectedRoutes({children,allowed}) {
    const user =useAuthStore((s) => s.user)
    const token =useAuthStore((s) => s.token)
    if (!token || !user){
        return <Navigate to={"/login"}/>
    }
    if (role && !allowed.includes(user.user_type) ){
         return <Navigate to={"/"}/>
    }
    return children
}
