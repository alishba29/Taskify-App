import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./adminOrg/AuthContext"; // Import useAuth hook
import "./UserManagement.css"; // Import CSS for styling

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("alphabetical");
  const { user } = useAuth(); // Use useAuth hook to access user data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user) {
          // Check for both user and token
          setError("Please log in to access users.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true, // Include credentials for cookie-based authentication
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]); // Re-run useEffect when user changes (e.g., after login)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredUsers = users
    .filter((user) => {
      if (searchTerm) {
        return (
          user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (filterOption === "alphabetical") {
        const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
        const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="alphabetical">Sort by Alphabetical Order</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                <td>{user.role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
