import React, { useState } from 'react';
import axios from 'axios';

export default function CheckUser() {

    const [checkMember, setCheckMember] = useState(true);

    const [member, setMember] = useState({
        email: 'kumamumi.seup@gmail.com',
        tel: '0951128117',
    });

    const [appoint, setAppoint] = useState([]);

    
    const apListOnsen = appoint.filter(ap => ap.onsen).map(ap => {
        const date = new Date(ap.onsen.date);
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        return {
            room: ap.onsen.room,
            date: dateStr,
            time: timeStr
        };
    });
    const dateOnsen = apListOnsen.map(item => item.date);
    const listDateOnsen = [...new Set(dateOnsen)];

    const apListMassage = appoint.filter(ap => ap.massage).map(ap => {
        const date = new Date(ap.massage.date);
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        return {
            room: ap.massage.room,
            date: dateStr,
            time: timeStr
        };
    });
    const dateMassage = apListMassage.map(item => item.date);
    const listDateMassage = [...new Set(dateMassage)]


    const [sTime, setSTime] = useState(false);
    const [sType, setSType] = useState(false);

    const [listTime, setListTime] = useState([]);

    const [focusDate, setFocusDate] = useState('2/23/2023');
    const [focusTime, setFocusTime] = useState('');
    const [focusType, setFocusType] = useState('');

    const handleChange = (event) => {
        setMember({
            ...member,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeDate = (event) => {
        setFocusDate(event.target.value);
        setTime();
        setSTime(true);
        setSType(false);
    }

    const handleChangeTime = (event) => {
        setFocusTime(event.target.value);
        setSType(true);
    }

    // const handleChangeType = (event) => {
    //     setFocusType(event.target.value);
    // }

    const setTime = () => {
        const bothAppoint = [...apListOnsen, ...apListMassage];
        
        const time = [];
        for (let index = 0; index < bothAppoint.length; index++) {
            if (bothAppoint[index].date === focusDate) {
                time.push(bothAppoint[index].time)
            }
        }
        setListTime(Array.from(new Set(time)))

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = []
            await axios.post(`http://localhost:8080/user/check`, member)
                .then(res => response.push(...res.data));
            setAppoint(response);

            setCheckMember(false);
        } catch (error) {
            console.error(error);
        }
    }

    const calTimeOp = sTime ? (
        <>
            <select name='time'
                value={focusTime}
                onChange={handleChangeTime}>
                {listTime.map((option, index) => (
                    <option key={`time-${index}`} value={option}>{option}</option>
                ))}
            </select>

        </>
    ) : null;


    //component แรกที่มี input email tel กับปุ่ม ไว้เช็ค User
    const calMemberForm = checkMember ? (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" value={member.email} onChange={handleChange} />
                <input type="tel" value={member.tel} onChange={handleChange} />
                <button type='submit'></button>
            </form>
        </>
    ) : null;


    return (
        
        <>
            {/* components หลังจากที่กดเช็คไปแล้ว */}
            {!checkMember ? (
                <div>
                    <div>
                        <span>Profile</span>
                        <span>Name : {appoint[0].name}</span>
                        <span>Email : {appoint[0].email}</span>
                        <span>Tel : {appoint[0].tel}</span>
                    </div>

                    <div>
                        <span>Booking</span>
                        <div>
                            <span>วันที่ทำการจอง</span>
                            <select name='date'
                                value={focusDate}
                                onChange={handleChangeDate}>
                                <option hidden selected></option>
                                <option disabled>Onsen</option>
                                {listDateOnsen.map((option, index) => (
                                    <option key={`onsen-${index}`} value={option} >{option.substring(0, 10)}</option>
                                ))}
                                <option disabled>Massage</option>
                                {listDateMassage.map((option, index) => (
                                    <option key={`massage-${index}`} value={option} >{option.substring(0, 10)}</option>
                                ))}
                            </select>
                            {calTimeOp}
                        </div>
                    </div>
                </div>

            ) : (
                <div>
                    {calMemberForm}
                </div>
            )
            }
        </>
    )
}