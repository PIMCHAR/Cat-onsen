import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/user');
      setUsers(result.data);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {
        users.map(user => (
          <li key={user.id}>{user.email},{user.tel},{user.appointment}</li>
        ))
      }
    </ul>
  );
};

export default UserList;
