
import "./Home.css";

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts } from "../Fragmentos/Posts/Posts";

export const Home = () => {
  const navigate = useNavigate();

  //Conectamos con Redux en modo lectura
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

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

        </div>

        <div className="profileMisPostes">
          <Posts />
        </div>
      </div>

    </>
  );
};