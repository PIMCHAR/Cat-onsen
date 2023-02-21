import React, { useState } from 'react';
import axios from 'axios';
import "./appointList.component.css";
import hotSpringPic from '../assets/hotSpring.svg';
import massagePic from '../assets/massage.svg';

function AppointList() {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().substr(0, 10);

    const [apType, setApType] = useState('onsen');
    const [apDate, setApDate] = useState(tomorrowFormatted);
    const [apTime, setApTime] = useState('08:00:00.000+00:00');

    const [checkFormGetRoom, setCheckFormGetRoom] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleInputType = (event) => {
        setApType(event.target.value);
        setCheckFormGetRoom(false);
    };

    const handleInputDate = (event) => {
        setApDate(event.target.value);
        setCheckFormGetRoom(false);
    };

    const handleInputTime = (event) => {
        setApTime(event.target.value);
        setCheckFormGetRoom(false);
    };

    const [listRoomUn, setListRoomUn] = useState([]);
    const checkedRooms = (listRoom) => {
        if (apType === 'onsen') {
            setListRoomUn([
                { id: 1, value: "H01", disabled: listRoom.includes(1) },
                { id: 2, value: "H02", disabled: listRoom.includes(2) },
                { id: 3, value: "H03", disabled: listRoom.includes(3) },
                { id: 4, value: "H04", disabled: listRoom.includes(4) },
                { id: 5, value: "H05", disabled: listRoom.includes(5) },
                { id: 6, value: "H06", disabled: listRoom.includes(6) }
            ])
        } else {
            setListRoomUn([
                { id: 1, value: "M01", disabled: listRoom.includes(1) },
                { id: 2, value: "M02", disabled: listRoom.includes(2) },
                { id: 3, value: "M03", disabled: listRoom.includes(3) },
            ])
        }
    };


    const handleCheckboxChange = (event) => {
        const roomId = Number(event.target.name);
        const isChecked = event.target.checked;
        setSelectedRooms((prevSelectedRooms) => {
            if (isChecked) {
                return [...prevSelectedRooms, roomId];
            } else {
                return prevSelectedRooms.filter((id) => id !== roomId);
            }
        });
    };

    const calPrice = () => {
        if (apType === 'onsen') {
            return selectedRooms.length * 250;
        } else {
            return selectedRooms.length * 120;
        }

    };

    //format
    const titlePic = () => {
        if (apType === 'onsen') {
            return (
                <>
                    <img src={hotSpringPic} alt="logo hot spring" />
                    <span>Hot Spring</span>
                    <span>45 mins</span>
                </>
            )
        } else {
            return (
                <>
                    <img src={massagePic} alt="logo massage" />
                    <span>Thai Massage</span>
                    <span>50 mins</span>
                </>
            )
        }
    }

    const checkedValues = listRoomUn.filter((room) => selectedRooms.includes(room.id))
        .sort((a, b) => a.id - b.id)
        .map((room) => room.value);

    function formatDate(dateString) {
        const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const date = new Date(dateString);
        const dayOfWeek = weekdays[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        return `${dayOfWeek} ${dayOfMonth} ${month}`;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8080/${apType}/date/${apDate}T${apTime}`)
            .then(res => {
                const roomUn = res.data
                const listRoom = roomUn.map(room => room.room);

                checkedRooms(listRoom);
                setCheckFormGetRoom(true);
            })
            .catch(err => {
                console.error(err);
            });

    };

    const checkboxAppointInfo = checkFormGetRoom ? (
        <>
            <div>
                {listRoomUn.map((option) => (
                    <label key={option.id}>
                        <input
                            type="checkbox"
                            name={option.id}
                            disabled={option.disabled}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                ))}
            </div>
            <div>
                <span>SUMMARY</span>
                <div>
                    {titlePic()}
                    <span>Information</span>
                    <span>{formatDate(apDate)}</span>
                    <span>{apTime.substring(0, 5)}</span>
                    <span>ROOMS :</span>
                    {checkedValues.join(', ')}
                    <span>PRICE : {calPrice()} THB</span>
                    <button>APPOINT NOW</button>
                </div>
            </div>
        </>
    ) : null;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select name="type" value={apType} onChange={handleInputType}>
                    <option value="onsen">onsen</option>
                    <option value="massage">massage</option>
                </select>
                <input type="date" name="date" value={apDate} min={tomorrowFormatted} onChange={handleInputDate} />
                <select name="time" value={apTime} onChange={handleInputTime}>
                    <option value="08:00:00.000+00:00">08:00</option>
                    <option value="09:00:00.000+00:00">09:00</option>
                    <option value="10:00:00.000+00:00">10:00</option>
                </select>
                <button type="submit">Check Availability</button>
            </form>
            {checkboxAppointInfo}
        </>
    );
};

export default AppointList;