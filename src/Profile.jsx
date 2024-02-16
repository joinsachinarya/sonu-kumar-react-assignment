import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const userData = await response.json();
            setUser(userData);
            setEditedUser(userData);
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        });
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        });
        setUser("Deleted User");
    };

    if (!user) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    }
    if (user === "Deleted User") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                User Deleted!!
                <Link to={"/"}>Go back to Home</Link>
            </div>
        );
    }
    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h1 style={{ marginBottom: 20 }}>{user.name}&apos;s Profile</h1>
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} style={{ borderRadius: '50%', marginRight: 20, float: 'left' }} />
            {isEditing ? (
                <div style={{ float: 'left' }}>
                    <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
                    <input type="text" name="email" value={editedUser.email} onChange={handleChange} />
                    <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
                    <input type="text" name="website" value={editedUser.website} onChange={handleChange} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div style={{ float: 'left' }}>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                        <strong>Website:</strong> {user.website}
                    </p>
                    <p>
                        <strong>Company:</strong> {user.company.name}
                    </p>
                    <p>
                        <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                    </p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
