import React, { useState } from "react";
import axios from "axios";

const UserAdd = () => {
  const [newUser, setNewUsers] = useState({
    email: "",
    tel: "",
    appointment: {
      "room":3,
      "payment":"16",
      "date":"2023-01-27"
  }
  });

  const handleChange = event => {
    setNewUsers({
      ...newUser,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/user', newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="tel"
        value={newUser.tel}
        onChange={handleChange}
        placeholder="Tel"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserAdd;