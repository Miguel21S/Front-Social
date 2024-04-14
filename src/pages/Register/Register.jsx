
import './Register.css'
import { CInput } from '../../common/CInput/CInput'

//Redux
// import { userData, register, login } from "../../app/slices/userSlice";
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../services/rootss';
import { useState } from 'react';

export const Register = () => {
    const navigate = useNavigate()

    //Instancia de Redux para escritura
    // const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const registrar = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }
            const fetched = await RegisterUser(user);
            console.log("O QUE SUCEDE", fetched);
            // setMsgError(fetched.message);

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <div className="register-design">
                <div className="rowl">
                    <CInput
                        type="name"
                        name="name"
                        placeholder=" name..."
                        value={user.name || ""}
                        changeEmit={inputHandler}
                    />
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
                    <button type='button' className="btn btn-success" onClick={ registrar }>Registrarse</button>

                    <p>¿Aún no tienes una cuenta?</p>

                    <label onClick={ ()=> navigate("/login") }>Acceder</label>
                </div>
            </div>
        </>
    )
}
