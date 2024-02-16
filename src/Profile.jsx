import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const userData = await response.json();
            setUser(userData);
        };
        fetchUser();
    }, [id]);

    if (!user) {
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Loading...</div>;
    }

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h1 style={{ marginBottom: 20 }}>{user.name}&apos;s Profile</h1>
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} style={{ borderRadius: "50%", marginRight: 20, float: "left" }} />
            <div style={{ float: "left" }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    );
};

export default Profile;
