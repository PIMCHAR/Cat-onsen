import React from "react";
import "./homeone.component.css";
import Menu from "../components/menu";
import Two from "../components/hometwo";

export default function Homeone() {
  return (
    <div>
      <div>
        <Menu />
      </div>
      <div className="ppp">
        <img
          className="img3"
          src="https://sandogoya-onsen.com/assets/images/home/facilities1.webp"
          alt=""
        />
        <img
          className="img1"
          src="https://sandogoya-onsen.com/assets/images/home/facilities2.webp"
          alt=""
        />
        <p className="BodyandSoul">
          For The Perfect Balance of <br /> Body and Soul <br />
          <p className="Relax">
            All Let’s Relax treatments are meticulously designed <br /> to take
            our guest to the height of relaxation and relieve stress. <br />
            Similarly, our spa packages let guests enjoy sets of spa treatments
            that suit their specific desire. <br /> The standardized massage
            technique makes sure you experience <br /> Let’s Relax Spa’s
            original service every time, everywhere by our certified therapist.
          </p>
          <p className="book1">book now</p>
        </p>
        <marquee direction="left" className="co1" scrollamount="20">
          cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat
          japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan
          onsencat japan onsen cat japan onsen cat japan onsencat japan onsen
          cat japan onsen cat japan onsen
        </marquee>
        <img
          className="img2"
          src="https://sandogoya-onsen.com/assets/images/home/facilities3.webp"
          alt=""
        />
      </div>
      <footer className="f1"></footer>
      <div className="map1"></div>
      <img
        className="img4"
        src="https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.15752-9/332746626_721976629416996_6856229966033084423_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEATDP-qDueEJgUbGNKXMVw4a65de5cNqThrrl17lw2pKfJXCvaf_JKnnsWGp5hei91TVfxd0ohbxNKgpPlcmSM&_nc_ohc=8giyVgsqbjYAX9Q4X2n&_nc_ht=scontent.fbkk5-3.fna&oh=03_AdS-NRrIHW0uPN4iywpgQQA1slFkyTnF1exFFuUqFFUJzg&oe=641E8128"
        alt=""
      />
      <div className="map ">
        <div class="container text-center ">
          <div class="map3 row ">
            <li class="pp3 col-md-2">Access</li>
            <div class="pp4 ">アクセス</div>
          </div>
          <div class="map4 row">
            <div class="map2 border border-1 text-start col-md-3 offset-md-3">
              {" "}
              19 Mae Ka Subdistrict, <br />
              Mueang Phayao District, <br />
              Phayao 56000{" "}
            </div>
            <div class="pp2 col-md-3 offset-md-3 text-center">
              Tel 054466666
            </div>
            <div class="pp1 col-md-3 offset-md-3 text-start">
              {" "}
              19 Mae Ka Subdistrict, <br /> Mueang Phayao District,
              <br /> Phayao 56000
            </div>
          </div>
        </div>
        <marquee direction="left" className="co2" scrollamount="5">
          cat japan onsen cat japan onsen cat japan onsen cat japan onsen cat
          japan onsen cat japan onsen cat japan onsen cat japan onsen cat japan
          onsencat japan onsen cat japan onsen cat japan onsencat japan onsen
          cat japan onsen cat japan onsen
        </marquee>
      </div>
      <div className="twotwo">
        <Two />
      </div>
    </div>
  );
}
