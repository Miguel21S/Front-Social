
import "./Home.css";
// import Profiler from '../Profile/Profile'

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { Profile } from "../Profile/Profile";
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
            <Profile />
            </div>

            <div className="home-top-right">
              post
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