
import React, { useEffect, useState } from "react";
import './MenuPost.css'
// import { CInput } from "../../../common/CInput/CInput";
import { useSelector } from "react-redux";
import { useFetcher, useNavigate } from "react-router-dom";
import { userData } from "../../../app/slices/userSlice";
import { ListaDeMisSeguidores, ListaDeSiguiendo, ListarMisPosts } from "../../../services/rootss";

export const MenuPost = () => {
    const navigate = useNavigate();
    const [postsCount, setPostsCount] = useState(0);
    const [seguidoresCount, setseguidoresCount] = useState(0);
    const [siguiendoCount, setSiguiendoCount] = useState(0);
    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    // const inputHandler = (e) => {
    //     setPostear((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // }

    ////////////////////    MÉTODO QUE LISTA MIS SEGUIDORES     ///////////////////////
    useEffect(() => {
        const listaSeguidore = async () => {
            try {
                const seguidorr = await ListaDeMisSeguidores(token);
                setseguidoresCount(seguidorr)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaSeguidore();
    }, [token]);

    /////////////////    LISTAR MIS USUARIOS QUE SIGO     ///////////////////////
    useEffect(() => {
        const listaSiguiendo = async () => {
            try {
                const siguiendo = await ListaDeSiguiendo(token);
                setSiguiendoCount(siguiendo);
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaSiguiendo();
    }, [token])
    
    ////////////////////    MÉTODO QUE LISTA MIS POSTS     ///////////////////////
    useEffect(() => {
        const listaPosts = async () => {
            try {
                const postes = await ListarMisPosts(token)
                setPostsCount(postes)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaPosts();
    }, [token]);


    return (
        <div className="menu-left-perfil">
            <div className="menu-left-elementos">
                <button className="menu-left-Seguidores">Seguidores <div className="f">{seguidoresCount.cantFollewer}</div></button>
                <button className="menu-left-Siguiendo">Siguiendo   <div className="f1">{siguiendoCount.cantFollowin}</div></button>
                <label className="menu-left-posts">Publicaciones    <div className="f2">{postsCount.postsCount}</div></label>
            </div>
        </div>
    );
};