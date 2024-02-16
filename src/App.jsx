import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users",);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [])


  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
      <h1>All Users: 👇</h1>
      <ul style={{ listStyleType: "none", padding: 0, width: "100%", maxWidth: 900 }}>
        {users && users.map((user) => (
          <li key={user.id} style={{ marginBottom: 40, padding: 20, border: "1px solid #ccc", borderRadius:"12px", display: "flex", alignItems: "center" }}>
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} style={{ borderRadius: "50%", marginRight: 10, flexShrink: 0, width: 50, height: 50 }} />
            <div>
              <h3 style={{ margin: 0 }}>Name: {user.name}</h3>
              <p style={{ margin: 0 }}>Email: {user.email}</p>
              <Link to={`/profile/${user.id}`} style={{ color: "blue", textDecoration: "underline", marginTop: 5 }}>View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
