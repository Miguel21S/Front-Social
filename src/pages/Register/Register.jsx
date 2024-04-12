
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

/*
cardCustom 
vista detalle
char.name.length > 10 ? char.name.substring(0.5) : char.name
*/

/*
import React, { useEffect, useState } from "react";
import { CInput } from "../../../common/CInput/CInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CrearPost } from "../../../services/rootss";

export const CreatePost = () => {
    const navigate = useNavigate();

    const [postear, setPostear] = useState({
        title: "",
        tests: ""
    });

    const inputHandler = (e) => {
        setPostear((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])
    
    const crearNuevoPost = async () => {
        try {
            for (let elemento in postear) {
                if (postear[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }

            const fetched = await CrearPost(token);
            console.log("POST CREADO CON SUCCESO", fetched)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-post">
            <h2>Crear un nuevo post</h2>

            <div className="rowl">
                <label htmlFor="title">Título:</label>
                <CInput
                    type="name"
                    name="name"
                    placeholder=" name..."
                    value={postear.title || ""}
                    changeEmit={inputHandler}
                />

                <label htmlFor="content">Contenido:</label>
                <textarea
                    id="content"
                    value={postear.tests}
                    onChange={(event) => setPostear(event.target.value)}
                    required
                ></textarea>
                <button type="button" onClick={crearNuevoPost} className="btn btn-primary">
                    Crear
                </button>
            </div>
        </div>
    );
};
*/