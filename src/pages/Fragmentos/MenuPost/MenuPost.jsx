
import React, { useEffect, useState } from "react";
import './MenuPost.css'
// import { CInput } from "../../../common/CInput/CInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../../app/slices/userSlice";
import { ListarMisPosts } from "../../../services/rootss";

export const MenuPost = () => {
    const navigate = useNavigate();
    const [postsCount, setPostsCount] = useState(0);

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

    ////////////////////    MÉTODO QUE LISTA MIS POSTS     ///////////////////////
    useEffect(() => {
        const listaPosts = async () => {
            try {
                const postes = await ListarMisPosts(token)
                setPostsCount(postes)
                console.log("QUE PASSA todos POST DIME", postes)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaPosts();
    }, [token]);


    return (
        <div className="create-post">
            <div className="profile-top-right">
                <button className="profile-Seguidores">Seguidores</button>
                <button className="profile-Siguiendo">Siguiendo</button>
                <label className="profile-posts">Publicaciones {postsCount.postsCount}</label>
            </div>
        </div>
    );
};