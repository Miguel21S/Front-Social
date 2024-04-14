
import React, { useEffect, useState } from "react";
import { CInput } from "../../../common/CInput/CInput";
import { CrearPost } from "../../../services/rootss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../../app/slices/userSlice";

export const CrearPostes = () => {
    const navigate = useNavigate();

    const [postear, setPostear] = useState({
        title: "",
        tests: ""
    });

    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    const inputHandler = (e) => {
        setPostear((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const crearNuevoPost = async () => {
        try {
            for (let elemento in postear) {
                if (postear[elemento] === "") {
                    throw new Error("Todos los campos tienen que estar rellenos");
                }
            }

            const fetched = await CrearPost(postear, token);
            console.log("POST CREADO CON SUCCESO", fetched)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-post">
            <h2>Crear un nuevo post</h2>

            <div className="row">
                <label className="title">Título:</label>
                <CInput
                    type="title"
                    name="title"
                    placeholder=" title..."
                    value={postear.title || ""}
                    changeEmit={inputHandler}
                />

                <label className="content">Contenido:</label>
                <CInput
                    type="tests"
                    name="tests"
                    placeholder=" tests..."
                    value={postear.tests || ""}
                    changeEmit={inputHandler}
                />
                {/* <textarea
                    id="content"
                    value={postear.tests}
                    placeholder=" test..."
                    onChange={(e) => setPostear(e.target.value)}
                    required
                ></textarea> */}
                <button type='button' onClick={crearNuevoPost} className="btn btn-primary">Crear</button>

            </div>
        </div>
    );
};