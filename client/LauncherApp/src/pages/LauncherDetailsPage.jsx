import React from 'react'
import { useState } from 'react'

export default function LauncherDetailsPage({id}) {
    const [launcher,setLauncher] = useState([])
    useEffect(() =>{
        fetch(`http://localhost:3000/api/launcher/${id}`)
        .then(res => res.json())
        .then(data =>{ 
            setLauncher(data)})
        .catch(()=> console.log("cannot get this launcher details")
        ),[]})
  return (
    <div>
        <thead>
            <tr>Id</tr>
            <tr>Name</tr>
            <tr>RocketType</tr>
            <tr>Latitude</tr>
            <tr>Longitude</tr>
        </thead>
        <tbody>
            {launcher.map((l)=>{
                <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.rocketType}</td>
                    <td>{l.latitude}</td>
                    <td>{l.longitude}</td>
                </tr>
            }

            )}
            
        </tbody>
    </div>
  )
}

