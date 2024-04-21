
import "./Login.css";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { loginService } from "../../services/rootss";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
//Redux
import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();

  //Instancia de Redux para escritura
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    const fetched = await loginService(user);

    if (fetched.token) {
      const decodificado = decodeToken(fetched.token);
      
      const passport = {
        token: fetched.token,
        user: decodificado,
      };

      dispatch(login({ credentials: passport }));

      if (decodificado.userRole === "superAdmin") {
        navigate("/gestionusuarios");
      } else {
        navigate("/");
      }

      // setTimeout(() => {
      //   navigate("/")
      // }, 500)
    }
  };

  return (
    <>
      <div className="login-design">
        <div className="rowl">
          <CInput
            type="email"
            name="email"
            placeholder=" email..."
            value={user.email || ""}
            changeEmit={inputHandler}
          />
          <CInput
            type="password"
            name="password"
            placeholder=" Password..."
            value={user.password || ""}
            changeEmit={inputHandler}
          />
          <button className="btn btn-success" onClick={loginMe}>Login</button>

          <p>¿Aún no tienes una cuenta?</p>
          <label onClick={() => navigate("/register")}>Registrarse</label>
        </div>
      </div>
    </>
  );
};
