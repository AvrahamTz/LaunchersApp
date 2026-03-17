import { useState } from "react";
import { useAuthStore } from "../store/authStore"

export default function DestroyedPage() {
    const token = useAuthStore((s) => s.token);
    const [id,setId]= useState("")
    const submit = async (e)=>{
        e.preventDeafult()
        try {
            const res = await fetch(`http://localhost:3000/api/launchers/${id}`,{
                method: 'PUT',headers:{Authorization: `Bearer ${token}`}})
            const data = await res.json()
            console.log(data);
            
        } catch (error) {
            console.error(error)
        }
        
        }
    
    
  return (
    <div>
        <form onSubmit={submit}>
            <input type="text" value={id} placeholder="enter the id of launcher" 
            onChange={e => setId(e.target.value)}/>
            <button>confirm</button>
        </form>
    </div>
  )
}
