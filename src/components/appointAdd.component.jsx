import React, { useState } from 'react';
import axios from 'axios';
import './appointAdd.component.css';
import './bs.css';

export default function AppointAdd(prop) {

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
      <div className='container d-flex justify-content-center'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col information-info" style={{ width: '700px' }}>
              <span>INFORMATION INFO</span>
              <hr />
              <div className="row mb-3 ">
                <div className='col mx-5'>
                  <label className="form-label">Yourname</label><br></br>
                  <input
                    type="name"
                    name="name"
                    value={formUser.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 mx-5">
                  <label className="form-label">Email</label><br />
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formUser.email}
                    onChange={handleChange}
                    required
                  /></div>
                <div className="col mx-0 px-0">
                  <label className="form-label">Telephone number</label><br />
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
              <div className="information-info-heading ">
                <span>PAYMENT DETAILS</span>
                <hr />
                <div className='payment mx-5'>

                </div>
                <div className=' mx-5'>
                  <label className="form-label">Upload receipt</label><br />
                  <input className='uploadImg' type="file" accept="image/png, image/jpeg" onChange={handleImageChange} required />
                </div>
              </div>

            </div>
            <div className="col-2" style={{ width: '340px', height: '495px' }}>
              <div className="row summary">
                <div className="col">
                  <span className='information-info-heading'>Summary</span>
                </div>
                <hr />
                {title()}
                <div className='row'>
                  <div className='col px-0'><span>Date</span></div>
                  <div className='col text-end'>{prop.dayDate}</div>
                </div>
                <div className='row'>
                  <div className='col px-0'><span>Session</span></div>
                  <div className='col text-end'>{prop.session.substring(0, 5)}</div>
                </div>
                <div className='row'>
                  <div className='col px-0'><span>Room</span></div>
                  <div className='col text-end'>{prop.checkedValues}</div>
                </div>
                <hr style={{ border: "1px dashed #fff" }} />
                <div className='row'>
                  <div className='col px-0'><span>Subtotal</span></div>
                  <div className='col text-end'> {prop.price} THB</div>
                </div>
                <div className='row'>
                  <div className='col px-0'><span>Tax(7%)</span></div>
                  <div className='col text-end'> {calTax()} THB</div>
                </div>
                <hr />
                <div className='row text-center '>
                  <span>Total Amount</span><br />
                  <span className='price'>{calToTal()} THB</span>
                </div>
              </div>
              <div className="row" style={{ justifyContent: 'center', width: '547px' }}>
                <button className='submit-btn' type="submit">CONFIRM</button>
              </div>
            </div>
          </div>
        </form >
      </div>
    </>
  );
};
