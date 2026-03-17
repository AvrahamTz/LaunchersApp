import { useEffect } from "react";
import { useState } from "react"

export default function RegisterPage() {
    const [users,setUsers] = useState([]);
    const [form,setForm] = useState({
        id: null,
        username:"",
        password:"",
        email:"",
        user_type:"intel"
    })
    const token =useAuthStore((s) => s.token)
    const [isEdit,setIsEdit] = useState(false)
    const [error,setError] = useState("")
     const getUsers = async () =>{
        try {
            const res = await fetch( "http://localhost:3000/api/auth/register/users",{
                method: 'DELETE',headers:{Authorization: `Bearer ${token}`}}
            )
            const data =await res.json()
            setUsers(data)
            
        } catch (error) {
            console.error(error)
        }
        useEffect(()=>{
            getUsers()
        },[])}
        
    const submit = async (e) =>{
        e.preventDeafult()
        try {
            const url = isEdit 
            ? 
            "http://localhost:3000/api/auth/register/update" 
            :
            "http://localhost:3000/api/auth/register/create"
            const method = isEdit ? "PUT" : "POST"
            const res = await fetch(url,{
                method,
                headers:{"Content-Type":"application/json",Authorization: `Bearer ${token}`}
            ,body:JSON.stringify(form)})
            const data = await res.json()
            console.log(data);
            setForm({
            id: null,
            username:"",
            password:"",
            email:"",
            user_type:"intel"}
            )
            setIsEdit(false)
            getUsers()
            
        } catch (error) {
                setError(error.message)
        }}
        
    const deleteUser = async (id) =>{
        try {
            const res = await fetch( `http://localhost:3000/api/auth/register/delete/${id}`,{
                method: 'DELETE',headers:{Authorization: `Bearer ${token}`}}
            )
            const data =await res.json()
            console.log(data);
            getUsers()
        } catch (error) {
            console.error(error)
        }}
        const editUser = (user) =>{
            setForm({
                id:user._id,
                username:user.username,
                password:"",
                email:user.email,
                user_type:user.user_type
        })
        setIsEdit(true)
        } 
        
    
  return (
    <div>
        
        <h2>{isEdit ? "EditUser" : "CreateUser"}</h2>
        <form onSubmit={submit}>
            <input type="text" placeholder="username" value={form.username} 
            onChange={e => setForm({...form,username:e.target.value})}/>
              <input type="text" placeholder="password" value={form.password} 
            onChange={e => setForm({...form,password:e.target.value})}/>
              <input type="text" placeholder="email" value={form.email} 
            onChange={e => setForm({...form,email:e.target.value})}/>
            <select value={form.user_type}
                onChange={e => setForm({...form,user_type:e.target.value})}>
                    <option value="intel">Intel</option>
                    <option value="airMilatry">AirMilatry</option>
                    {/* not adding Admin because you can't add more of the same role*/}
            </select>
                <button>{isEdit ? "Update" : "Create"}</button>
                {error &&  <p className="error">{error}</p>}
            </form>
            <table>
                <thead>
                <tr>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>UserRole</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u) => {
                    return (
                        <tr key={u._id}>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{u.email}</td>
                            <td>{u.user_type}</td>
                            <td>
                                <button onClick={editUser(u)}>Edit</button>
                                <button onClick={deleteUser(u._id)}></button>
                            </td>
                        </tr>

                    )
                })}
            </tbody>
            </table>
        
 </div>
  )
}
