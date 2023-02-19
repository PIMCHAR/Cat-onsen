import React, { useState } from 'react';
import axios from 'axios';
import "./appointList.component.css";

function AppointList() {

    const [appointments, setAppointments] = useState([]);
    const [apType, setType] = useState('onsen');
    const [apDate, setDate] = useState('2023-02-19');
    const [apTime, setTime] = useState('08:00:00.000+00:00');

    const [roomOptions, setRoomOptions] = useState([]);
    const checkedRooms = () => {
        if (apType === 'onsen') {
            setRoomOptions([
                { id: 1, value: "room1", disabled: false },
                { id: 2, value: "room2", disabled: false },
                { id: 3, value: "room3", disabled: false },
                { id: 4, value: "room4", disabled: false },
                { id: 5, value: "room5", disabled: false },
                { id: 6, value: "room6", disabled: false }
            ])
        } else {
            setRoomOptions([
                { id: 1, value: "room1", disabled: false },
                { id: 2, value: "room2", disabled: false },
                { id: 3, value: "room3", disabled: false },
            ])
        }
    };


    const handleInputType = (event) => {
        setType(event.target.value);
    };

    const handleInputDate = (event) => {
        setDate(event.target.value);
    };

    const handleInputTime = (event) => {
        setTime(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8080/${apType}/date/${apDate}T${apTime}`)
            .then(res => {
                //const roomUn = res.data
                //const listRoomUn = roomUn.map(room => room.room);
                setAppointments(res.data);
                checkedRooms();

                

            })
            .catch(err => {
                console.error(err);
            });

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select name="Type" value={apType} onChange={handleInputType}>
                    <option value="onsen">onsen</option>
                    <option value="massage">massage</option>
                </select>
                <input type="date" name="date" value={apDate} onChange={handleInputDate} />
                <select name="time" value={apTime} onChange={handleInputTime}>
                    <option value="08:00:00.000+00:00">08:00:00</option>
                    <option value="09:00:00.000+00:00">09:00:00</option>
                </select>
                <button type="submit">Check Availability</button>
            </form>
            <div>
                {appointments.map(appointment => (
                    <li key={appointment.id}>{appointment.room}</li>
                ))}
            </div>
            <div>
                {roomOptions.map((option) => (
                    <label key={option.id}>
                        <input
                            type="checkbox"
                            name={option.id}
                        />
                        {option.value}
                    </label>
                ))}
            </div>
        </>
    );
};

export default AppointList;