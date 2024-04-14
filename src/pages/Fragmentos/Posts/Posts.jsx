
import "./Posts.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListaDePosts } from "../../../services/rootss";
import { CrearPostes } from "../CrearPostes/CrearPostes";
import { userData } from "../../../app/slices/userSlice";
import { CLink } from "../../../common/CLink/CLink";
import { MenuPost } from "../MenuPost/MenuPost";

export const Posts = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [crearPost, setCrearPost] = useState(false);

    const crearPostTogglePopup = () => {
        setCrearPost(!crearPost);
    };

    // const [pages, setPages] = useState({
    //     previous: "",
    //     next: ""
    // })

    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    /////////////////    LISTAR POSTS     ///////////////////////
    useEffect(() => {
        const listaPosts = async () => {
            try {
                const postes = await ListaDePosts(token)
                // setPages({ previous: postes.data.prev, next: postes.data.next })
                setPosts(postes.data)
                console.log("QUE PASSA todos POST DIME", postes)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaPosts();
    }, [token]);

    // const changePage = async (destination) => {
    //     const li = await ListaDePosts()

    //     try {
    //         destination ? pages.next : pages.previous
    //         setPages({ previous: res.data.prev, next: res.data.next })
    //         setCharacters(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <div className='postContainer'>
                <div className="profileMisPostes">
                    <div id="postColunas" className="row">

                        <div id="menu-izquierdo" className="col-3">
                            <div className="containerPopup-Button">
                                <MenuPost />
                            </div>
                        </div>

                        <div id="posts-centro" className="col-6">
                            {
                                posts?.length > 0 ? (
                                    posts.map((post) => (
                                        <div className="cards" key={post._id}>
                                            <div className="card mb-4 h-100">
                                                <img src="..." className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{post.userName}</h5>
                                                    <p className="card-text">{post.title}</p>
                                                    <p className="card-text">{post.tests?.length > 50 ? post.tests.substring(0, 50) + "..." : post.tests}</p>

                                                    <button className="btn btn-primary">Go somewhere</button>
                                                    <div id="like" className="btn btn-primary" ><i className="bi bi-heart btn"></i></div>
                                                    <label htmlFor="">0</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No hay posts disponibles</div>
                                )
                            }

                            {/* <div onClick={() => changePage(false)}>Prev</div>
                            <div onClick={() => changePage(true)}>Next</div> */}

                        </div>

                        <div id="menu-derecha" className="col-3">
                            <div className="containerPopup-Button">
                                <button onClick={crearPostTogglePopup} className="crearPos"><i className="bi bi-building-fill-add"></i>Crear</button>
                                {crearPost && (
                                    <div className="popup">
                                        <button id="cerra" onClick={crearPostTogglePopup}><i className="bi bi-file-excel"></i> </button>
                                        <CrearPostes />
                                    </div>
                                )}
                            </div>
                            <div className="linkButton">
                                <CLink id="linkPerfil" path="/profile" title="Perfil" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
