import React from "react";
import AppointList from "../components/appointList.component";
import Onsen from "../assets/onsen.png";
import Menu from "../components/menu";
import Two from "../components/hometwo";
import "./booking.css";

export default function Booking() {
    return (
        <div>
            <div>
                <Menu />
            </div>
            <div className="container d-flex justify-content-start booking">
                <img className="mx-5 px-5 my-5" src={Onsen} alt="pic" />
                <marquee direction="left" className="cobookig" scrollamount="20">
                    cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat
                    japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan
                    onsencat japan onsen cat japan onsen cat japan onsencat japan onsen
                    cat japan onsen cat japan onsen
                </marquee>
                <span style={{ fontSize: '32px', marginTop: '500px' }}>Onsen <br />
                    Thai massage</span>
            </div>

            <div className="compo" style={{ marginTop: '4rem' }}>
                <AppointList />
            </div>
            <div className="footer">
                <Two />
            </div>
        </div>
    )
};