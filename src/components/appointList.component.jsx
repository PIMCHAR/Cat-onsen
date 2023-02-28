import React, { useState } from 'react';
import axios from 'axios';
import './appointList.component.css';
import './bs.css';
import AppointAdd from '../components/appointAdd.component';
import hotSpringPic from '../assets/hotSpring.svg';
import massagePic from '../assets/massage.svg';
import { Link } from 'react-router-dom';


export default function AppointList() {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().substring(0, 10);
    const [apType, setApType] = useState('onsen');
    const [apDate, setApDate] = useState(tomorrowFormatted);
    const [apTime, setApTime] = useState('08:00:00.000+00:00');
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [listRoomUn, setListRoomUn] = useState([]);
    const [checkFormGetRoom, setCheckFormGetRoom] = useState(false);
    const [checkSendData, setCheckSendData] = useState(false);

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
                { id: 4, value: "M04", disabled: listRoom.includes(4) }
            ])
        }
    };

    const handleInputType = (event) => {
        setApType(event.target.value);
        setCheckFormGetRoom(false);
        setSelectedRooms([]);
    };

    const handleInputDate = (event) => {
        setApDate(event.target.value);
        setCheckFormGetRoom(false);
        setSelectedRooms([]);
    };

    const handleInputTime = (event) => {
        setApTime(event.target.value);
        setCheckFormGetRoom(false);
        setSelectedRooms([]);
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
                setCheckSendData(false);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleData = () => {
        if (checkedValues.length > 0) {
            setCheckSendData(true);
            setCheckFormGetRoom(false);
        } else {
            alert('Please select at least one option.');
        }
    }

    const titlePic = () => {
        if (apType === 'onsen') {
            return (
                <>
                    <div className='row func-title'>
                        <div className='col-4'><img src={hotSpringPic} alt="logo hot spring" /></div>
                        <div className='col-4'>
                            <span style={{ fontSize: 'large' }}>Hot Spring</span><br/>
                            <span>45 mins</span>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='row func-title'>
                        <div className='col-4'><img src={massagePic} alt="logo massage" /></div>
                        <div className='col-4'>
                            <span style={{ fontSize: 'large' }}>Thai Massage</span><br/>
                            <span>50 mins</span>
                        </div>
                    </div>
                </>
            )
        }
    }

    const checkboxAppointInfo = checkFormGetRoom ? (
        <>
            <div className='col mx-0 m-5 px-4' style={{ width: '630px' }}>
                <span>SELECT ROOMS</span>
                <hr />
                <div className={apType}>
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
            </div>
            <div className='col-4 my-5'>
                <span>SUMMARY</span>
                <div className='summary mx-0'>
                    {titlePic()}
                    <div className='row my-4'>
                        <div className='col'>
                            <div><span>Information</span><br/>
                                {formatDate(apDate)}
                            </div>
                        </div>
                        <div className='col d-flex justify-content-end align-self-end'>
                            <span className='s-time'>{apTime.substring(0, 5)}</span>
                        </div>
                    </div>
                    <div className='row my-4'>
                        <div className='col'>
                            <div><span>ROOMS :</span><br/>
                                {checkedValues.join(', ')}
                            </div>
                        </div>
                        <div className='col'>
                            <div><span>PRICE :</span><br/>
                                {calPrice()} THB
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5 d-flex justify-content-center'>
                      <Link to={'/'}> <button type='submit' name='submit2' onClick={handleData}>APPOINT NOW</button> </Link> 
                    </div>
                </div>
            </div>
        </>
    ) : null;


    return (
        <>
            {checkSendData ? (
                <AppointAdd
                    type={apType}
                    listRoom={selectedRooms}
                    date={apDate}
                    session={apTime}
                    checkedValues={checkedValues.join(",")}
                    price={calPrice()}
                    dayDate={formatDate(apDate)}
                />
            ) : (
                <div className='container booking'>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-center'>
                            <div className='form-select'>
                                <div className='row position-relative px-4'>
                                    <div className='col py-1'>
                                        <label className="form-label">Check-in</label><br/>
                                        <input
                                            type="date"
                                            name="date"
                                            value={apDate}
                                            min={tomorrowFormatted}
                                            onChange={handleInputDate}
                                        />
                                    </div>
                                    <div className='col py-1' style={{marginLeft:'1.5rem'}}>
                                        <label className="form-label ">Time</label><br/>
                                        <select
                                            name="time"
                                            value={apTime}
                                            onChange={handleInputTime}
                                        >
                                            <option value="08:00:00.000+00:00">08:00</option>
                                            <option value="09:00:00.000+00:00">09:00</option>
                                            <option value="10:00:00.000+00:00">10:00</option>
                                        </select>
                                    </div>
                                    <div className='col py-1'>
                                        <label className="form-label ">Type</label><br/>
                                        <select
                                            name="type"
                                            value={apType}
                                            onChange={handleInputType}
                                        >
                                            <option value="onsen">onsen</option>
                                            <option value="massage">massage</option>
                                        </select>
                                    </div>
                                    <div className='col'>
                                        <button  type="submit" name="submit1">
                                            Check <br/> Availability
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='d-flex justify-content-center'>
                        <div className='row mt-4' style={{ width: '1067px' }}>
                            {checkboxAppointInfo}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};