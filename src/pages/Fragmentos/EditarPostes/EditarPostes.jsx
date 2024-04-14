
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../../app/slices/userSlice";
import { UpdatePost } from "../../../services/rootss";
import { CInput } from "../../../common/CInput/CInput";

export const EditarPostes = () => {
    const navigate = useNavigate();
    const [editarpost, setEditarPost] = useState({
        title: "",
        tests: ""
    });

    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    const inputHandler = (e) => {
        setEditarPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const actualizarPost = async (_id) => {
        try {
            const editaPost = await UpdatePost(editarpost, token);
            setEditarPost(editaPost);
            console.log("POST EDITADO CON SUCCESO", editaPost);
        } catch (error) {
            console.log(error);
        }
    }
   
    const editar = (valor) => {
        setEditarPost ({
            
            title: valor.title,
            tests: valor.tests,
        });
        // setListUpdate(true);
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
                value={editarpost.title || ""}
                changeEmit={inputHandler}
            />

            <label className="content">Contenido:</label>
            <CInput
                type="tests"
                name="tests"
                placeholder=" tests..."
                value={editarpost.tests || ""}
                changeEmit={inputHandler}
            />
            {/* <textarea
                    id="content"
                    value={postear.tests}
                    placeholder=" test..."
                    onChange={(e) => setPostear(e.target.value)}
                    required
                ></textarea> */}
            <button type='button' onClick={()=>actualizarPost} className="btn btn-primary">Editar</button>
            <button type='button' onClick={()=>editar(editarpost)} className="btn btn-primary">p</button>

        </div>
    </div>

);
}