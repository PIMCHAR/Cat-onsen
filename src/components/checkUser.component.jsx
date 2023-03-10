import React, { useState } from "react";
import axios from "axios";
import "../components/checkUser.component.css";

export default function CheckUser() {
  const [checkMember, setCheckMember] = useState(true);

  const [member, setMember] = useState({
    email: "kumamumi.seup@gmail.com",
    tel: "0951128117",
  });

  const [appoint, setAppoint] = useState([]);
  let [appointOnRooms, setAppointOnRooms] = useState([]);
  let [appointMsRooms, setAppointMsRooms] = useState([]);

  const apListOnsen = appoint
    .filter((ap) => ap.onsen)
    .map((ap) => {
      const date = new Date(ap.onsen.date);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString();
      return {
        room: ap.onsen.room,
        date: dateStr,
        time: timeStr,
      };
    });
  const dateOnsen = apListOnsen.map((item) => item.date);
  const listDateOnsen = [...new Set(dateOnsen)];

  const apListMassage = appoint
    .filter((ap) => ap.massage)
    .map((ap) => {
      const date = new Date(ap.massage.date);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString();
      return {
        room: ap.massage.room,
        date: dateStr,
        time: timeStr,
      };
    });
  const dateMassage = apListMassage.map((item) => item.date);
  const listDateMassage = [...new Set(dateMassage)];

  const [sTime, setSTime] = useState(false);
  const [sType, setSType] = useState(false);

  const [listTime, setListTime] = useState([]);

  const [focusDate, setFocusDate] = useState("2/23/2023");
  const [focusTime, setFocusTime] = useState("");
  const [focusType, setFocusType] = useState("");

  const handleChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value,
    });
  };

  const [listRoomUn, setListRoomUn] = useState([]);

  const checkedRooms = (listRoom) => {
    if (focusType === "onsen") {
      setListRoomUn([
        { id: 1, value: "H01", disabled: listRoom.includes(1) },
        { id: 2, value: "H02", disabled: listRoom.includes(2) },
        { id: 3, value: "H03", disabled: listRoom.includes(3) },
        { id: 4, value: "H04", disabled: listRoom.includes(4) },
        { id: 5, value: "H05", disabled: listRoom.includes(5) },
        { id: 6, value: "H06", disabled: listRoom.includes(6) },
      ]);
    } else {
      setListRoomUn([
        { id: 1, value: "M01", disabled: listRoom.includes(1) },
        { id: 2, value: "M02", disabled: listRoom.includes(2) },
        { id: 3, value: "M03", disabled: listRoom.includes(3) },
        { id: 4, value: "M04", disabled: listRoom.includes(4) },
      ]);
    }
  };

  const handleChangeDate = (event) => {
    console.log(event.target.value);
    setFocusDate(event.target.value);
    findTime();
    setSTime(true);
    setSType(false);
  };

  const handleChangeTime = (event) => {
    setFocusTime(event.target.value);
    console.log(event.target.value);
    setSType(true);
  };

  const handleChangeType = (event) => {
    setFocusType(event.target.value);
  };

  const findTime = () => {
    const bothAppoint = [...apListOnsen, ...apListMassage];

    const time = [];
    const onsenRooms = [];
    const massageRooms = [];
    for (let index = 0; index < bothAppoint.length; index++) {
      if (bothAppoint[index].date === focusDate) {
        time.push(bothAppoint[index].time);
        if (index < apListOnsen.length) {
          onsenRooms.push(bothAppoint[index].room);
        } else {
          massageRooms.push(bothAppoint[index].room);
        }
      }
    }

    setListTime(Array.from(new Set(time)));
    setAppointOnRooms(onsenRooms);
    setAppointMsRooms(massageRooms);
  };

  const findRoom = () => {
    if (focusType === "onsen") {
      checkedRooms(appointOnRooms);
    } else {
      checkedRooms(appointMsRooms);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = [];
      await axios
        .post(`http://localhost:8080/user/check`, member)
        .then((res) => response.push(...res.data));
      setAppoint(response);
      setCheckMember(false);
    } catch (error) {
      console.error(error);
    }
  };

  const calTimeOp = sTime ? (
    <>
      <select name="time" value={focusTime} onClick={handleChangeTime}>
        {listTime.map((option, index) => (
          <option key={`time-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  ) : null;

//   const calRoom = sType ? (
//     <>
//       <div className="mm">
//         <button name="type" value="onsen" onClick={handleChangeType}>
//           onsen
//         </button>
//         <button name="type" value="massage" onClick={handleChangeType}>
//           massage
//         </button>
//       </div>
//       <div></div>
//       <div>
//         <div>
//           {listRoomUn.map((option) => (
//             <label key={option.id}>
//               <input
//                 type="checkbox"
//                 name={option.id}
//                 disabled={option.disabled}
//               />
//             </label>
//           ))}
//         </div>
//         <span>status</span>
//       </div>
//     </>
//   ) : null;

  //component ???????????????????????? input email tel ????????????????????? ????????????????????? User
  const calMemberForm = checkMember ? (
    <>
      <div className="f">
        <h1 className="f1">Check Booking</h1>
      </div>
      <form onSubmit={handleSubmit} className="ff">
        <h2>Email</h2>
        <input type="email" value={member.email} onChange={handleChange} />{" "}
        <br /> <br />
        <h2>Password</h2>
        <input
          type="tel"
          value={member.tel}
          onChange={handleChange}
        /> <br /> <br />
        <button className="r" type="submit">
        Check
        </button>
        <marquee direction="left" className="cola" scrollamount="5">
          cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat
          japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan
          onsencat japan onsen cat japan onsen cat japan onsencat japan onsen
          cat japan onsen cat japan onsen
        </marquee>
      </form>
    </>
  ) : null;


  return (
    <>
      {/* components ?????????????????????????????????????????????????????????????????? */}
      {!checkMember ? (
        <div>
          <div className="alog">
            <span className="kp" >Profile</span> <br />
            <span className="ki">Name : {appoint[0].name}</span> <br />
            <span className="ko">Email : {appoint[0].email}</span> <br />
            <span className="kl">Tel : {appoint[0].tel}</span> <br />
          </div>

          <form className="ok">
          <br /> <br />  <spa className="oo">Booking</spa>  <br /> 
            <div className="sc">
              <span>??????????????????????????????????????????</span>  <br />  <br />
              <select name="date" value={focusDate} onChange={handleChangeDate}>
                <option disabled>Onsen</option>
                {listDateOnsen.map((option, i) => (
                  <option className="er" key={i} value={option}>
                    {option}
                  </option>
                ))}
                <option disabled>Massage</option>
                {listDateMassage.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {calTimeOp}
            </div>
          </form>
          {/* {calRoom} */}
        </div>
      ) : (
        <div>{calMemberForm}</div>
      )}
    </>
  );
}
