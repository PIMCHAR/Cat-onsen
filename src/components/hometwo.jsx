import React from "react";
import "../components/hometwo.css";
import Logo from '../assets/logo.png';

export default function Hometwo() {
  return (
    < div className="me">
     <img className="logo" src={Logo} alt="logo" />
     <p className="meo">designed by <br /> สามแมวมีโอ</p>
        </div>
  );
}

