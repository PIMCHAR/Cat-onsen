import "../components/menu1.css";
import React,{useState} from 'react';

export default function Menuone() {
  const [state,setState]=useState(false);
  let booking='http://localhost:3000/booking';
  let home = 'http://localhost:3000/'
  let check = 'http://localhost:3000/checkAppoint'
  
  return (
    <div className="">
     <input type="checkbox" id="active"/>
      <label for="active" class="menu-btn"><i class="fas fa-bars"></i></label>
      <div class="wrapper">
         <ul>
            <li><a href={home}>Home</a></li>
            <li><a href="#">タイマッサージ Thai Massage</a></li>
            <li><a href="#">温泉 Onsen</a></li>
            <li><a href={booking}>予約 Book Now</a></li>
            <li><a href={check}>Check Booking</a></li>
         </ul>
      </div>
    </div>
  );
}
