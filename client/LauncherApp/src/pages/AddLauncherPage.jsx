import React from 'react'
import { useState } from 'react'

export default function AddLauncherPage() {
 const [form,setForm] = useState({
    name:"",
    rocketType:"",
    latitude:"",
    longitude:"",
    city:""
    })
    
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSumbit = async  (e) => {
        e.preventDefault()
         const res = await fetch("http://localhost:3000/api/launchers",{
            method: 'POST',
            headers:
            {"Content-Type":"application/json"},
            body:JSON.stringify(form)
        })
        const data =await res.json()
        console.log(data);
        
    } 
        

    
  return (
    <div>
        <h1>Add a new launcher</h1>
        <form onSubmit={handleSumbit}>
            <input name="name" placeholder='name' onChange={handleChange}/>
            <select name="rocketType" onChange={handleChange}>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
            <input name="latitude" placeholder='latitude(number)' onChange={handleChange}/>
            <input name='longitude' placeholder='longitude(number)' onChange={handleChange}/>
            <input name='city' placeholder='city' onChange={handleChange}/>
            <button>addLauncher</button>
        </form>
    </div>

  )
}
