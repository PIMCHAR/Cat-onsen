import React, { useState } from "react";
import axios from "axios";
import "./appointAdd.component.css";

function AppointAdd(prop) {
  const [newAppoint, setNewAppoints] = useState({
    room: 3,
    payment: "test",
    date: "2023-01-27",
    user: {
      email: "",
      tel: "",
      name: ""
    }
  });

  /*{
    room: 3,
    payment: "test",
    date: "2023-01-27",
    user: {
      email: "",
      tel: "",
      name: ""
    }
  }*/

  /*prop.title,date,session,room,price */
  

  const handleChange = event => {
    setNewAppoints({
      ...newAppoint,
      user: {
        ...newAppoint.user,
        [event.target.name]: event.target.value
      }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/massage', newAppoint)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  const calTax = (prop) => {
    return prop.price * 0.07;
  }

  const calToTal = (prop) => {
    return  parseFloat(prop.price) + calTax(prop);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-7 information-info">
          <div className="row">
            <div className="col">
              <span>INFORMATION INFO</span>
            </div>
            <div className="col text-end">
              <span>you already have account ? </span>
              <span>LOGIN</span>
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Yourname</label>
            <input
              type="name"
              className="form-control"
              name="name"
              value={newAppoint.user.name}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={newAppoint.user.email}
                onChange={handleChange}
              /></div>
            <div className="col">
              <label htmlFor="formGroupExampleInput" className="form-label">Telephone number</label>
              <input
                type="tel"
                name="tel"
                className="form-control"
                value={newAppoint.user.tel}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="information-info-heading">
            <span>PAYMENT DETAILS</span>
          </div>
          <hr />
          <label htmlFor="formGroupExampleInput" className="form-label">Upload receipt</label>
          <input type="file" accept="image/png" />
          <button type="submit">Upload</button>
        </div>
        <div className="col-4">
          <div className="row summary">
            <div className="col">
              <span>Summary</span>
            </div>
            <div className="col text-end">
              <span>Edit</span>
            </div>
            <hr />
            <span>Date</span> {prop.date}
            <span>Session</span> {prop.session}
            <span>Room</span> {prop.checkedValues}
            <hr style={{ border: "1px dashed #fff" }} />
            <span>Subtotal</span>{prop.price} THB
            <span>Tax(7%)</span>{calTax(prop)} THB
            <hr />
            Total Amount {calToTal(prop)} THB
          </div>
          <div className="row submit-btn">
            <button type="submit">CONFIRM</button>
          </div>
        </div>
      </div>

    </form >
  );
};

export default AppointAdd;