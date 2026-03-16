import { useEffect } from "react"
import { useState } from "react"
import LauncherDetailsPage from "./LauncherDetailsPage"
import { Link } from "react-router"

export default function HomePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() =>{
    fetch("http://localhost:3000/api/launcher")
    .then(res => res.json())
    .then(data =>{ 
        setData(data);
        setLoading(false);
    })
    .catch(()=>{ 
        console.error("cannot get data");
        setLoading(false);
    })},[])
    const filteredData = data.filter(launcher =>{
        const matchSearch = launcher.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter ? launcher.rocketType === filter:true
        return matchSearch && matchFilter
    })

  return (
    <div>
        <div>
            <Link to={"/adding"}>addALauncher</Link>
        </div>
        <input type="text" placeholder="search by launcher name" value ={search}onchange ={e => setSearch(e.target.value)}/>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Shahab3">Shahab3</option>
            <option value="Fetah110">Fetah110</option>
            <option value="Radwan"></option>
            <option value="Kheibar">Kheibar</option>
        </select>
        <thead>
            <tr>Name</tr>
            <tr>RocketType</tr>
            <tr>Latitude</tr>
            <tr>Longitude</tr>
        </thead>
        <tbody>
        {data.map((u)=>{
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.rocketType}</td>
              <td>{l.latitude}</td>
              <td>{l.longitude}</td>
              <Link to={`/launcher/:${u._id}`}>Details</Link>
            </tr>
        })}
        </tbody>
    </div>
  )
}
