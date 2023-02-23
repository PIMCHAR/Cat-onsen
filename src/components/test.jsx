import React, { useState } from "react";
import axios from "axios";
import "./appointAdd.component.css";

function Test(prop) {

    const [image, setImage] = useState(null);
    const apType = prop.type;
    const apPrice = prop.price;

    const [formUser, setFormUser] = useState({
        email: "",
        tel: "",
        name: ""
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
                    massage: {
                        room: rooms[i],
                        date: "2023-02-23T08:00:00.000+00:00",
                        user: formUser,
                    },
                    image: image,
                };

                const formData = new FormData();
                formData.append("massage", JSON.stringify(newAppoint.massage));
                formData.append("image", newAppoint.image);

                const response = await axios.post(
                    "http://localhost:8080/massage",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log(`Response for room ${rooms[i]}:`);
                console.log(response);
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                            /></div>
                        <div className="col">
                            <label htmlFor="formGroupExampleInput" className="form-label">Telephone number</label>
                            <input
                                type="tel"
                                name="tel"
                                className="form-control"
                                value={formUser.tel}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="information-info-heading">
                        <span>PAYMENT DETAILS</span>
                    </div>
                    <hr />
                    <label htmlFor="formGroupExampleInput" className="form-label">Upload receipt</label>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                    <button type="submit">Upload</button>
                </div>
                <div className="col-3">
                    <div className="row summary">
                        <div className="col">
                            <span>Summary</span>
                        </div>
                        <div className="col text-end">
                            <span>Edit</span>
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
    );
}

export default Test;
