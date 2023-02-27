import React, { useState } from 'react';
import axios from 'axios';

export default function CheckUser() {

    const [checkMember, setCheckMember] = useState(true);
    const [member, setMember] = useState({
        email: 'kumamumi.seup@gmail.com',
        tel: '0951128117',
    });
    const [memberName, setMemberName] = useState('');

    const [listOnsen, setListOnsen] = useState([]);
    const [listMassage, setListMassage] = useState([]);

    const [listDateOnsen, setListDateOnsen] = useState([]);
    const [listDateMassage, setListDateMassage] = useState([]);

    const [focusDate, setFocusDate] = useState('');
    const [focusTime, setFocusTime] = useState('');
    const [focusType, setFocusType] = useState('');

    const [sTime, setSTime] = useState(false);
    const [sType, setSType] = useState(false);


    const [listTime, setListTime] = useState([3.00, 4.00, 5.00]);

    const handleChange = (event) => {
        setMember({
            ...member,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/user/check`, member);
            const appointData = response.data;

            const apListOnsen = appointData.filter(ap => ap.onsen).map(ap => {
                let date = new Date(ap.onsen.date);
                let dateStr = date.toLocaleDateString();
                let timeStr = date.toLocaleTimeString();
                return {
                    room: ap.onsen.room,
                    date: dateStr,
                    time: timeStr
                };
            });

            const apListMassage = appointData.filter(ap => ap.massage).map(ap => {
                let date = new Date(ap.massage.date);
                let dateStr = date.toLocaleDateString();
                let timeStr = date.toLocaleTimeString();
                return {
                    room: ap.massage.room,
                    date: dateStr,
                    time: timeStr
                };
            });

            const dateOnsen = apListOnsen.map(item => item.date);
            const dateMassage = apListMassage.map(item => item.date);

            const uqDateOn = [...new Set(dateOnsen)];
            const uqDateMa = [...new Set(dateMassage)];

            const memberName = appointData[0].name;

            setCheckMember(false);

            setMemberName(memberName);

            setListOnsen(apListOnsen);
            setListMassage(apListMassage);

            setListDateOnsen(uqDateOn);
            setListDateMassage(uqDateMa);

            console.log(listOnsen)
            console.log(listDateOnsen)

        } catch (error) {
            console.error(error);
        }
    }

    const setTime = () => {
        const bothAppoint = [...listOnsen, ...listMassage];
        const filteredAppoints = bothAppoint.filter(ap => ap.date === { focusDate });
        const uqTime = Array.from(new Set(filteredAppoints));
        setListTime(uqTime);
    }

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

    const handleChangeType = (event) => {
        setFocusType(event.target.value);
    }

    //component แรกที่มี input email tel กับปุ่ม ไว้เช็ค User
    const calMemberForm = checkMember ? (
        <>
            <form action="handleSubmit">
                <input type="email" value={member.email} onChange={handleChange} />
                <input type="tel" value={member.tel} onChange={handleChange} />
                <button onClick={handleSubmit}></button>
            </form>
        </>
    ) : null;

    const calTimeOp = sTime ? (
        <>
            <select name='time'
                value={focusTime}
                onChange={handleChangeTime}>
                {listTime.map((option,index) => (
                    <option key={`time-${index}`} value={option}>{option}</option>
                ))}
            </select>

        </>
    ) : null;

    console.log(focusDate)
   
    return (
        <>
            {/* components หลังจากที่กดเช็คไปแล้ว */}
            {!checkMember ? (
                <div>
                    <div>
                        <span>Profile</span>
                        <span>Name : {memberName}</span>
                        <span>Email : {member.email}</span>
                        <span>Tel : {member.tel}</span>
                    </div>
                    <div>
                        <span>Booking</span>
                        <div>
                            <span>วันที่ทำการจอง</span>
                            <select name='date'
                                value={focusDate}
                                onChange={handleChangeDate}>
                                <option disabled>Onsen</option>
                                {listDateOnsen.map((option, index) => (
                                    <option key={`onsen-${index}`} value={option} >{option}</option>
                                ))}
                                <option disabled>Massage</option>
                                {listDateMassage.map((option, index) => (
                                    <option key={`massage-${index}`} value={option} >{option}</option>
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