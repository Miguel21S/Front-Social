
import "./Home.css";

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyPerfil } from "../../services/rootss";
import { Posts } from "../Fragmentos/Posts/Posts";
import { CLink } from "../../common/CLink/CLink";
// import { MenuPost } from "../Fragmentos/MenuPost/MenuPost";

export const Home = () => {
  const navigate = useNavigate();

  const [miPerfil, setMiPerfil] = useState({});

  //Conectamos con Redux en modo lectura
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;


  useEffect(() => {
    const perfil = async () => {
      try {
        const misDatos = await MyPerfil(token);
        setMiPerfil(misDatos.data);
      } catch (error) {
        console.log("Error al en traer los datos:", error);
      }
    };
    perfil();
  }, [token])

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  //Instancia de Redux en modo lectura para home
  const searchRdx = useSelector(searchData);

  useEffect(() => {
    // console.log(searchRdx);
  }, [searchRdx]);

  return (
    <>
      <div className="home-Design">
        <div className="home-top">

          <div className="home-top-left">
            <div className="profile-design">
              <div className="profile-wrapper">
                <div className="profile-left">
                  {
                    miPerfil?.length > 0 ? (

                      miPerfil.map((perfil) => (
                        <div className="perfilUsuario" key={perfil._id}>
                          <p>{perfil.name}</p>
                          <CLink path="/profile" title="Perfil" />
                        </div>
                      ))
                    ) : (
                      <p>No hay datos de perfil disponibles</p>
                    )
                  }

                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="todosPostes">
          <Posts />
        </div>
      </div>
    </>
  );
};