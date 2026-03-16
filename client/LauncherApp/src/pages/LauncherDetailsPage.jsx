import { useState,useEffect} from 'react'
import { useParams } from 'react-router'

export default function LauncherDetailsPage() {
    const {id} = useParams()
    const [launcher,setLauncher] = useState([])
    
    useEffect(() =>{
        fetch(`http://localhost:3000/api/launchers/${id}`)
        .then(res => res.json())
        .then(data =>{ 
            setLauncher(data)})
        .catch(()=> console.log("cannot get this launcher details")
        ),[]})
        const deleteLauncher = async () =>{
        await fetch(`http://localhost:3000/api/launchers/${id}`,{
            method: 'DELETE',})
        .then(res => res.json())
        .then(data =>{console.log(data);})
        .catch(()=> console.log("cannot get this launcher details")
        )}
  return (
    <div>
        <table>
        <thead>
            <tr>Name</tr>
            <tr>RocketType</tr>
            <tr>Latitude</tr>
            <tr>Longitude</tr>
            <tr>City</tr>
        </thead>
        <tbody>
            {launcher.map((l)=>{
                <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.rocketType}</td>
                    <td>{l.latitude}</td>
                    <td>{l.longitude}</td>
                    <td>{l.city}</td>
                </tr>
            }

            )}
            
        </tbody>
        </table>
        <br/>
        <button onClick={deleteLauncher}>Remove</button>
    
    </div>
  )
}

