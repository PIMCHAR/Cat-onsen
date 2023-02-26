import React, { useState } from 'react';
import axios from 'axios';
import './appointAdd.component.css';

function AppointAdd(prop) {

  const [image, setImage] = useState(null);
  const apType = prop.type;
  const apPrice = prop.price;
  const apDateTime = `${prop.date}T${prop.session}`;

  const [formUser, setFormUser] = useState({
    email: '',
    tel: '',
    name: ''
  });

  const handleChange = (event) => {
    setFormUser({
      ...formUser,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const title = () => {
    if (apType === 'onsen') {
      return (
        <>
          <span>Hot spring (private onsen 45 mins)</span>
        </>
      )
    } else {
      return (
        <>
          <span>Massage (thai massage 50 mins)</span>
        </>
      )
    }
  }

  const calTax = () => {
    return apPrice * 0.07;
  }

  const calToTal = () => {
    return parseFloat(apPrice) + calTax(apPrice);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rooms = prop.listRoom

    try {
      for (let i = 0; i < rooms.length; i++) {
        const newAppoint = {
          [apType]: {
            room: rooms[i],
            date: apDateTime,
            user: formUser,
          },
          image: image,
        };

        const formData = new FormData();
        formData.append(apType, JSON.stringify(newAppoint[apType]));
        formData.append('image', newAppoint.image);

        const response = await axios.post(
          `http://localhost:8080/${apType}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 information-info">
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
                  value={formUser.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formUser.email}
                    onChange={handleChange}
                    required
                  /></div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput" className="form-label">Telephone number</label>
                  <input
                    type="tel"
                    name="tel"
                    className="form-control"
                    value={formUser.tel}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="information-info-heading">
                <span>PAYMENT DETAILS</span>
              </div>
              <hr />
              <label htmlFor="formGroupExampleInput" className="form-label">Upload receipt</label>
              <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} required />
              <button type="submit">Upload</button>
            </div>
            <div className="col-3">
              <div className="row summary">
                <div className="col">
                  <span>Summary</span>
                </div>
                <div className="col text-end">
                </div>
                <hr />
                {title()}
                <span>Date</span>
                {prop.dayDate}
                <span>Session</span>
                {prop.session.substring(0, 5)}
                <span>Room</span>
                {prop.checkedValues}
                <hr style={{ border: "1px dashed #fff" }} />
                <span>Subtotal</span>
                {prop.price} THB
                <span>Tax(7%)</span>
                {calTax()} THB
                <hr />
                Total Amount
                {calToTal()} THB
              </div>
              <div className="row submit-btn">
                <button type="submit">CONFIRM</button>
              </div>
            </div>
          </div>
        </form >
      </div>
    </>
  );
};

export default AppointAdd;