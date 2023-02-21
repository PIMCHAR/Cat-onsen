import React from "react";
//import AppointAdd from "../components/appointAdd.component";
import AppointList from "../components/appointList.component";
import "./booking.css";

export default function Booking() {
    return (
        <div>
            <div className="compo">
                <AppointList />
                {/*
                <AppointAdd type='onsen' listRoom="[1,2]" date='THU 15 DEC' session='HH:MM' checkedValues='P01,P02' price='500' />
             */}
            </div>
        </div>

    )
};
/*prop.title,date,session,room,price */