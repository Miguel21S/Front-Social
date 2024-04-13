
import "./Post.css"
import React, { useEffect, useState } from 'react'
import { eliminarPost, ListarMisPosts } from "../../../services/rootss";
import { useSelector } from "react-redux";
import { userData } from "../../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Post = () => {
    const navigate = useNavigate();
    const [editarPost, setEditarPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("Posts");

    const editarPostTogglePopup = () => {
        setEditarPost(!editarPost);
    }
    const openCard = (cardName) => {
        setActiveTab(cardName);
    };

    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    /////////////////    LISTAR MIS POSTS     ///////////////////////
    useEffect(() => {
        const misPosts = async () => {
            try {
                const post = await ListarMisPosts(token);
                setPosts(post.data);
                console.log("QUE PASSA POST DIME", post)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        misPosts();
    }, [token])

    /////////////////    ELIMINAR MI POSTS     ///////////////////////
    const delet = async (_id) => {
        try {

            const elimina = await eliminarPost(_id, token);
            console.log("Eliminación del post:", elimina);
        } catch (error) {
            console.log("Error al eliminar el post:", error);
        }
    }

    return (
        <>
            <div className='postContainer'>
                <div className="profileMisPostes">

                    <div id="Paris" className="tabcontent" style={{ display: activeTab === "Paris" ? "block" : "none" }}>
                        <h3>***T****</h3>
                        <p>--------------------.</p>
                    </div>

                    <div id="Tokyo" className="tabcontent" style={{ display: activeTab === "Tokyo" ? "block" : "none" }}>
                        <h3>***K***</h3>
                        <p>------------------.</p>
                    </div>

                    <div className="tab">
                        <button
                            className={activeTab === "Posts" ? "tablinks active" : "tablinks"}
                            onClick={() => openCard("Posts")}
                        >
                            <i className="bi bi-grid-3x3"></i>
                        </button>
                        <button
                            className={activeTab === "Paris" ? "tablinks active" : "tablinks"}
                            onClick={() => openCard("Paris")}
                        >
                            <i className="bi bi-bookmarks"></i>
                        </button>
                        <button
                            className={activeTab === "Tokyo" ? "tablinks active" : "tablinks"}
                            onClick={() => openCard("Tokyo")}
                        >
                            ***K***
                        </button>
                    </div>

                    <div id="Posts" className="tabcontent" style={{ display: activeTab === "Posts" ? "block" : "none" }}>
                        <h3>Posts</h3>
                        <div className="row">
                            {
                                posts?.length > 0 ? (
                                    posts.map((post) => (
                                        <div className="col-md-4" key={post._id}>
                                            <div className="card mb-4 h-100">
                                                <img src="..." className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{post.userName}</h5>
                                                    <p className="card-text">{post.title}</p>
                                                    <p className="card-text">{post.tests.length > 50 ? post.tests.substring(0, 50) + "..." : post.tests}</p>

                                                    
                                                        <button id="mas" onClick={editarPostTogglePopup} className="btn btn-primary">Mas...</button>
                                                        {editarPost && (
                                                            <div className="popup">
                                                                <button onClick={editarPostTogglePopup}></button>
                                                           
                                                            </div>
                                                        )}
                                                    

                                                    <div id="like" className="btn btn-primary" ><i className="bi bi-heart btn"></i></div>
                                                    <label >0</label>
                                                    <button id="delete" className="btn btn-danger" onClick={() => delet(post._id)}><i className="bi bi-trash"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay posts disponibles</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
