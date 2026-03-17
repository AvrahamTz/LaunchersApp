import { useState,useEffect} from 'react'
import { useParams } from 'react-router'

export default function LauncherDetailsPage() {
    const {id} = useParams()
    const [launcher,setLauncher] = useState([])
    
   useEffect(() => {
    fetch(`http://localhost:3000/api/launchers/${id}`)
    .then(res => res.json())
    .then(data => {
      setLauncher([data])
    })
    .catch(() => console.log("cannot get this launcher details"))
    }, [id])
        const deleteLauncher = async () =>{
        try {
            const res = await fetch(`http://localhost:3000/api/launchers/${id}`,{
                method: 'DELETE',})
            const data = await res.json()
            console.log(data);
            
        } catch (error) {
            console.error(error)
        }
        
        }
  return (
    <div>
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>RocketType</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>City</th>
            </tr>
        </thead>
        <tbody>
            {launcher.map((l)=>(
                <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.rocketType}</td>
                    <td>{l.latitude}</td>
                    <td>{l.longitude}</td>
                    <td>{l.city}</td>
                </tr>
            )

            )}
            
        </tbody>
        </table>
        <br/>
        <button onClick={deleteLauncher}>Remove</button>
    
    </div>
  )
}

