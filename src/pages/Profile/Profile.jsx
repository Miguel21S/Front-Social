
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
// import { useEffect } from "react";

// import { profile } from "../../app/slices/cartSlice";
import { useDispatch } from 'react-redux';
import { ListaDeMisSeguidores, ListaDeSiguiendo, MyPerfil } from "../../services/rootss";
import { useEffect, useState } from "react";
import { Post } from "../Post/Post";

export const Profile = () => {

    const [perfi, setPerfil] = useState({});
    // const [posts, setPosts] = useState({});
    const [siguiendo, setSiguiendo] = useState({});
    const [siguidores, setSiguidores] = useState({});
    const [showPopup, setShowPopup] = useState(false);


    const navigate = useNavigate();
    //Instancia de Redux para escritura
    const dispatch = useDispatch();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    /////////////////    LISTAR MI PERFIL     ///////////////////////
    useEffect(() => {
        const miPerfil = async () => {
            try {
                const perfil = await MyPerfil(token);
                setPerfil(perfil.data);
                console.log("QUE PASSA PERFIL DIME", perfil)

            } catch (error) {
                console.log("Error en fetching profile:", error);
            }
        };
        miPerfil();
    }, [token]);

    /////////////////    LISTAR MIS POSTS     ///////////////////////
    // useEffect(() => {
    //     const misPosts = async () => {
    //         try {
    //             const posts = await ListarMisPosts(token);
    //             setPosts(posts);
    //             console.log("QUE PASSA POST DIME", posts)
    //         } catch (error) {
    //             console.log("Error en fetching users:", error);
    //         }
    //     }
    //     misPosts();
    // }, [token])

    /////////////////    LISTAR MIS USUARIOS QUE SIGO     ///////////////////////

    useEffect(() => {
        const losQeSigo = async () => {
            try {
                const sigo = await ListaDeSiguiendo(token);
                setSiguiendo(sigo);
                console.log("QUE PASSA SIGO DIME", sigo)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        losQeSigo();
    }, [token])

    /////////////////    LISTAR MIS USUARIOS QUE SIGO     ///////////////////////
    useEffect(() => {
        const misSeguidores = async () => {
            try {
                const Seguidore = await ListaDeMisSeguidores(token);
                setSiguidores(Seguidore);
                console.log("QUE PASSA SEGUIDORES DIME", Seguidore)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        misSeguidores();
    }, [token])

    return (
        <>
            <div className="container-principal">
                <div className="profile-design">
                    <div className="profile-wrapper">
                        <div className="profile-left">
                            {perfi?.length > 0 ? (
                                perfi.map((perf) => (
                                    <div key={perf._id}>
                                        <p>Usuario: {perf.name}</p>
                                        <p>Email: {perf.email}</p>
                                    </div>
                                ))

                            ) : (
                                <p>No hay datos de perfil disponibles</p>
                            )}
                        </div>

                        <hr />
                        <div className="profile-right">

                            <div className="profile-posts">Posts 1256.555</div>

                            <div className="container">
                                <div onClick={togglePopup} className="profile-Seguidores">Seguidores 1256.555</div>
                                {showPopup && (
                                    <div className="popup">
                                        <button onClick={togglePopup}>Cerrar</button>
                                        <h2>Vista Reducida SEGUIDORES</h2>
                                        {/* Contenido de la vista reducida */}
                                    </div>
                                )}

                                <div onClick={togglePopup} className="profile-Siguiendo">Siguiendo 1256.555</div>
                                {showPopup && (
                                    <div className="popup">
                                        <button onClick={togglePopup}>Cerrar</button>
                                        <h2>Vista Reducida SEGUIDOS</h2>
                                        {/* Contenido de la vista reducida */}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <Link to='/'>
                        <h3 className="profile-myProfile">Profile</h3>
                    </Link> */}
                    </div>

                </div>

                <div className="profileMisPostes">
                    <Post />
                </div>
            </div>
        </>
    )
}