
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
import { useNavigate } from 'react-router-dom';

export const Header = ({ user }) => {

  //Instancia de conexion a modo lectura
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  // const token = rdxUser?.credentials?.token;
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
      <div className="header-wrapperr">
        <div className="header-right">
          <div className="row">

            {
              rdxUser.credentials?.token ? (
                <>
                  {

                    rdxUser?.credentials?.user.userRole === "superAdmin" ?
                      <>
                        <div className="col">
                          <div className="header-left">
                            <CLink id='header-left' path="/" title="Conhecer-te" />
                          </div>
                        </div>

                        <div className="col">
                          <div className="header-center">
                            <CInput
                              type="text"
                              name="criteria"
                              placeholder="Buscar usuario..."
                              value={criteria || ""}
                              changeEmit={searchHandler}
                            />
                          </div>
                        </div>

                        <div id='gestion-salir' className="col">
                          <CLink path="/gestionusuarios" title="Usuarios"> Lista de Usuarios</CLink>
                          <div
                            className="out-design"
                            onClick={() => dispatch(logout({ credentials: "" }))}
                          >
                            <div onClick={() => navigate("/login")}>
                              Salir
                            </div>

                          </div>
                        </div>

                      </>
                      :
                      <>
                        <div className="col">
                          <div className="header-left">
                            <CLink path="/" title="Conhecer-te" />
                          </div>
                        </div>

                        <div className="col">
                          <div className="header-center">
                            <CInput
                              type="text"
                              name="criteria"
                              placeholder="Buscar usuario..."
                              value={criteria || ""}
                              changeEmit={searchHandler}
                            />
                          </div>

                        </div>
                        <div className="col">
                          <div id='gestion-salir'
                            className="out-design"
                            onClick={() => dispatch(logout({ credentials: "" }))}
                          >
                            <div onClick={() => navigate("/login")}>
                              Salir
                            </div>

                          </div>
                        </div>
                      </>
                  }
                </>

              ) : (
                <>
                  <div className="col">
                    <div className="navigator-design">
                      <CLink path="/login" title="Iniciar Sensión" />
                      <CLink path="/register" title="Registrarse" />
                    </div>
                  </div>
                </>

              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};
