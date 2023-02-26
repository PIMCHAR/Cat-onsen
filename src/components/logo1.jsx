import React from "react";
import "../components/logo1.css";
import Logo from "../assets/logo.png";
import Homeone from "./homeone.component";

export default function Hometwo() {
  return (
    <div className="tt">
      <img className="logo" src={Logo} alt="logo" />
      <div>
        <Homeone />
      </div>
    </div>
  );
}
