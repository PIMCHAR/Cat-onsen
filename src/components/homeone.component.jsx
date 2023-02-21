import React from "react";
import "./homeone.component.css";

export default function Homeone() {
  return (
    <div>
      <div className="ppp">
        <img className="img3" src="https://sandogoya-onsen.com/assets/images/home/facilities1.webp" alt="" />
        <img
          className="img1"
          src="https://sandogoya-onsen.com/assets/images/home/facilities2.webp"
          alt=""
        />
        <p className="BodyandSoul">
          For The Perfect Balance of <br /> Body and Soul
        </p>
        <p className="Relax">
          All Let’s Relax treatments are meticulously designed <br /> to take
          our guest to the height of relaxation and relieve stress. <br />{" "}
          Similarly, our spa packages let guests enjoy sets of spa treatments
          that suit their specific desire. <br /> The standardized massage
          technique makes sure you experience <br /> Let’s Relax Spa’s original
          service every time, everywhere by our certified therapist.
        </p>
        <p className="book1">book now</p>
        <marquee  direction="left" className="co1" scrollamount="20">cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan onsencat japan onsen cat japan onsen cat japan onsencat japan onsen cat japan onsen cat japan onsen</marquee>
        <img
          className="img2"
          src="https://sandogoya-onsen.com/assets/images/home/facilities3.webp"
          alt=""
        />
      </div>
      <footer className="f1">
      </footer>
    </div>
  );
}
