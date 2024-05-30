import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useAuth } from './adminOrg/AuthContext';
import { useNavigate } from 'react-router-dom';
import './OrgSettings.css'; // Import the CSS file

const EditOrg = () => {
    const { user, logout } = useAuth();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setLoading(true);
            axios.get(`http://localhost:5000/organizations/${user._id}`)
                .then((response) => {
                    const { name, type, roles } = response.data;
                    setName(name);
                    setType(type);
                    setRoles(roles);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    alert('An error occurred while fetching the organization details.');
                });
        }
    }, [user]);

    const handleRolesChange = (index, field, value) => {
        const updatedRoles = [...roles];
        updatedRoles[index][field] = value;
        setRoles(updatedRoles);
    };

    const handleSaveOrg = () => {
        const data = {
            name,
            type,
            roles
        };
        setLoading(true);
        axios.put(`http://localhost:5000/organizations/${user._id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/AdminPannel');
                window.location.reload();
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while saving the organization details.');
            });
    };

    const handleAddRole = () => {
        setRoles([...roles, { name: '', level: '' }]);
    };

    const handleRemoveRole = (index) => {
        const updatedRoles = roles.filter((_, i) => i !== index);
        setRoles(updatedRoles);
    };

    const handleDeleteOrg = () => {
        if (window.confirm('Are you sure you want to delete your organization? This action cannot be undone.')) {
            setLoading(true);
            axios.delete(`http://localhost:5000/organizations/${user._id}`)
                .then(() => {
                    setLoading(false);
                    navigate('/HomePage'); 
                    logout();                
                })
                .catch((error) => {
                    setLoading(false);
                    alert('An error occurred while deleting the organization.');
                });
        }
    };

    return (
        <div className="OrgSettings-container">
            <BackButton />
            <h1 className="OrgSettings-h1">Edit Organization</h1>
            {loading ? <p>Loading...</p> : (
                <form>
                    <div className="form-group">
                        <label>Organization Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Organization Type:</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                    </div>
                    <div>
                        <h2>Roles:</h2>
                        <button type="button" className="add-role-button" onClick={handleAddRole}>Add Role</button>
                        <ul>
                            {roles.map((role, index) => (
                                <li key={index} className="role-item">
                                    <div className="form-group">
                                        <label>Role Name:</label>
                                        <input type="text" value={role.name} onChange={(e) => handleRolesChange(index, 'name', e.target.value)} required />
                                        <label>Level Number:</label>
                                        <input type="number" value={role.level} onChange={(e) => handleRolesChange(index, 'level', e.target.value)} required />
                                        <button type="button" className="remove-role-button" onClick={() => handleRemoveRole(index)}>Remove Role</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="button" className="save-button" onClick={handleSaveOrg}>Save Organization</button>
                </form>
            )}
            <h2>Delete Organization</h2>
            <p className="delete-warning">Warning: All your organization information will be permanently deleted.</p>
            <button type="button" className="delete-button" onClick={handleDeleteOrg}>Delete Organization</button>
        </div>
    );
};

export default EditOrg;
