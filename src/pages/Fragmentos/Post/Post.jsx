
import "./Post.css"
import React, { useEffect, useState } from 'react'
import { eliminarPost, ListarMisPosts, UpdatePost } from "../../../services/rootss";
import { useSelector } from "react-redux";
import { userData } from "../../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { EditarPostes } from "../EditarPostes/EditarPostes";
import { CInput } from "../../../common/CInput/CInput";

export const Post = () => {
    const navigate = useNavigate();
    const [editarPost, setEditarPost] = useState(false);
    const [postSeleccionado, setPostSeleccionado] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editedPost, setEditedPost] = useState({
        title: "",
        tests: "",
        postId: "",
    });

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
    
    const inputHandler = (e) => {
        setEditedPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const editarPostTogglePopup = (post) => {
        setPostSeleccionado(post);
        setEditedPost({
            title: post.title,
            tests: post.tests,
            postId: post._id,
        });
        setEditarPost(true);
    }

    const cerrarPopupEdicion = () => {
        setEditarPost(false);
    }


    const actualizarPost = async (_id) => {
        try {

            const editaPost = await UpdatePost(_id, editedPost, token);
            setEditedPost(editaPost);
            console.log("POST EDITADO CON SUCCESO", editaPost);
            console.log("ID DEL POST", _id);
            // const { _id, ...postData } = postSeleccionado;
            // await UpdatePost(_id, postData, token);
            // setPosts((prevPosts) => prevPosts.map((post) => {
            //     if (post._id === _id) {
            //         return {
            //             ...post,
            //             ...editedPost
            //         };
            //     }
            //     return post;
            // }));
            cerrarPopupEdicion();
        } catch (error) {
            console.log("Error al actualizar el post:", error);
        }
    }
    /////////////////    ELIMINAR MI POSTS     ///////////////////////
    const eliminarMiPost = async (_id) => {
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

                    {editarPost && (
                        <div className="popup">
                            <button id="cerrar" onClick={() => cerrarPopupEdicion(editedPost._id)}><i className="bi bi-file-excel"></i></button>
                            {/* <EditarPostes post={postSeleccionado} /> */}

                            <CInput
                                type="title"
                                name="title"
                                placeholder=" title..."
                                value={editedPost.title || ""}
                                changeEmit={inputHandler}
                            />

                            <textarea
                                type="tests"
                                name="tests"
                                value={editedPost.tests || ""}
                                placeholder=" test..."
                                onChange={inputHandler}
                                required
                            ></textarea>
                            <button type='button' id="btn-salvar" onClick={()=>actualizarPost(editedPost.postId)} className="btn btn-primary">Salvar<i id="btnIcon" className="bi bi-check2"></i></button>
                        </div>
                    )}

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

                                                <button id="editar" className="btn btn-warning" onClick={() => editarPostTogglePopup(post)}>Editar<i id="btnIcon" className="bi bi-feather"></i></button>

                                                <div id="like" className="btn btn-primary" ><i className="bi bi-heart btn"></i></div>
                                                <button id="delete" className="btn btn-danger" onClick={() => eliminarMiPost(post._id)}><i id="btnIcon" className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No hay posts disponibles</div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}