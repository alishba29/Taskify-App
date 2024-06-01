import React, { useState, useEffect } from 'react';
import CreateUserApiService from './services/CreateUserApiService';

const CreateUserForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await CreateUserApiService.getRoles();
        setRoles(response.data.roles);
      } catch (error) {
        console.error('Error fetching roles', error);
      }
    };

    fetchRoles();
  }, []);

  const generateRandomPassword = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomPassword = generateRandomPassword(); // Generate random password here

    try {
      const response = await CreateUserApiService.createUser({
        firstname,
        lastname,
        email,
        roleId: selectedRole,
        password: randomPassword, // Use generated password in the request body
      });
      setGeneratedUsername(response.data.username);
      setGeneratedPassword(randomPassword); // Set the generated password to state
      alert('User created successfully');
    } catch (error) {
      console.error('Error creating user', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'Error creating user');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        <button type="submit">Create User</button>
      </form>
      {generatedUsername && (
        <div>
          <h3>User Created</h3>
          <p>Username: {generatedUsername}</p>
          <p>Password: {generatedPassword}</p>
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
