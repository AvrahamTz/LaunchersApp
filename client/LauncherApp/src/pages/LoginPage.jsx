import { useState } from "react"
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [form ,setForm] =useState({
        username:"",
        password:""
    })
    const login = useAuthStore(s => s.login);
    const submit = async (e)=>{
        e.preventDeafult()
        setError("")
        setLoading(false)
        try {
            const res = await fetch( "http://localhost:3000/api/auth/login",{
                method: 'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(form)}
            )
            const data =await res.json()
            if(!res.ok){
                throw new Error(data.message||"login failed!!")
            }
            login(data.token,data.user)
            navigate("/")
            
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
        
    }
  return (
    <div className="login-container">
        <form className="login-box"onSubmit={submit}>
            <h2>Login</h2>
            <input type="text" placeholder="username" value={form.username} 
            onChange={e => setForm({...form,username:e.target.value})}/>
            <input type="text" placeholder="username" value={form.password} 
            onChange={e => setForm({...form,password:e.target.value})}/>
            {error &&  <p className="error">{error}</p>}
            <button 
            disabled={loading}>{loading ? "Logging in..." :"Login"}
            </button>
        </form>
    </div>
  )
}
