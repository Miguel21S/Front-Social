
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Header.css";
import { useState } from "react";
import { CLink } from "../CLink/CLink";

//RDX

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { CInput } from "../CInput/CInput";

export const Header = () => {
  //Instancia de conexion a modo lectura
  const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rdxUser, " credenciales pasaporte");
  }, [rdxUser]);

  const [criteria, setCriteria] = useState("")

  const searchHandler = (e) => {
    setCriteria(e.target.value)
  }

  useEffect(() => {
    if (criteria !== "") {
      //guardo en redux.....
      dispatch(updateCriteria(criteria))
    }
  }, [criteria])

  return (
    <div className="header-design">
      <div className="header-left">
        <CLink path="/" title="Home" />
      </div>

      <div className="header-center">
        <CInput
          type="text"
          name="criteria"
          placeholder="Buscar usuario..."
          value={criteria || ""}
          changeEmit={searchHandler}
        />
      </div>

      <div className="header-right">
        {rdxUser?.credentials?.token ? (
          <div className="navigator-design">
            <CLink path="/profile" title={rdxUser?.credentials?.user?.name} dest />

            {/* <div class="dropdown">
              <button class="dropbtn">Dropdown</button>
              <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div> */}
            <div
              className="out-design"
              onClick={() => dispatch(logout({ credentials: "" }))}
            >
              log out
            </div>
          </div>
        ) : (
          <div className="navigator-design">
            <CLink path="/login" title="Login" />
            <CLink path="/register" title="Register" />
          </div>
        )}
      </div>
    </div>
  );
};
