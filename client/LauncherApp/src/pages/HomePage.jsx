import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router"

export default function HomePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() => {
        fetch("http://localhost:3000/api/launchers",{headers:{Authorization: `Bearer ${token}`}})
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);

                setLoading(false);
            })
            .catch(() => {
                console.error("cannot get data");
                setLoading(false);
            })
    }, [])
    const filteredData = data.filter(launcher => {

        const matchSearch = launcher.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter ? launcher.rocketType === filter : true
         
        return matchSearch && matchFilter
    })
    
    if (loading) return <p>loading...</p>
    return (
        <>
            <input className="search" type="text" placeholder="search by launcher name" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="filter" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Shahab3">Shahab3</option>
                <option value="Fetah110">Fetah110</option>
                <option value="Radwan">Radwan</option>
                <option value="Kheibar">Kheibar</option>
            </select>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>RocketType</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>City</th>
                    <th>details</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((u) => {
                    return (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.rocketType}</td>
                            <td>{u.latitude}</td>
                            <td>{u.longitude}</td>
                            <td>{u.city}</td>
                            <Link className="details"to={`/launcher/${u._id}`}>Details</Link>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </>
    )
}
