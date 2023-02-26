import React from "react";
import "../components/menu.css";
import Menuone from "../components/menu1";

export default function Menu() {
  return (
    <div>
       
      <nav class="navbar fixed-top bg-transparent ">
        <p class="name1 navbar-brand bg-transparent text-light" href="#">
          ネコ <br />
          日本 <br />
          温泉
        </p>
        <p class="name2 bg-transparent  ">
          温 <br /> 泉 <br /> へ <br /> よ <br /> う <br /> こ <br /> そ
          <br />
          <Menuone/>
          <img
            className="fac bg-transparent"
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/333435398_592744959384231_3764916061476133185_n.png?stp=cp0_dst-png&_nc_cat=108&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeELc2AEZ14DyNmDx88ymdZgWujXwFL8YzBa6NfAUvxjME-STKtTfCMejao7TOBZpB5FoA9voxM6rrWj26X6qg6c&_nc_ohc=MbGap9XjuD0AX8MIYeg&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSqMFzQj2i7U9SCoY_MgMuF618tOX6rCxMklZdgrjj35w&oe=64218A7E"
            alt=""
          />
        </p>
      </nav>
      
    </div>
  );
}
