
import "./Home.css";
// import Profiler from '../Profile/Profile'

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
// import { Profile } from "../Profile/Profile";
export const Home = () => {
  //Instancia de Redux en modo lectura para home

  const searchRdx = useSelector(searchData);

  useEffect(() => {
    console.log(searchRdx);
  }, [searchRdx]);

  return (
    <>
      <div className="home-Design">
        <div className="home-top">

          <div className="home-top-left">
            <div className="profile-design">
              <div className="profile-wrapper">
                <div className="profile-left">
                  <p>Usuario Miguel</p>
                  <p>Perfil</p>
                </div>

                <hr />
                <div className="profile-right">
                  <div className="profile-Seguidores">**************</div>
                  <div className="profile-Siguiendo">**************</div>
                  <div className="profile-posts">**************</div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="tab">
            <button className="tablinks" onclick>London</button>
            <button className="tablinks" onclick>Paris</button>
            <button className="tablinks" onclick>Tokyo</button>
          </div>
        </div>

        <div className="home-bottom">
          item 2
        </div>
        soy home

      </div>

    </>
  );
};