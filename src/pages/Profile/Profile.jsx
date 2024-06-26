
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
import { ActualizarMiPerfil, ListaDeMisSeguidores, ListaDeSiguiendo, ListarMisPosts, MyPerfil } from "../../services/rootss";
import { useEffect, useState } from "react";
import { Post } from "../Fragmentos/Post/Post"
import { CInput } from "../../common/CInput/CInput";

export const Profile = () => {
    const navigate = useNavigate();

    const [siguiendo, setSiguiendo] = useState({});
    const [miSeguidores, setMiSeguidores] = useState(false);
    const [seguidosPorMi, setSeguidosPorMi] = useState(false);
    const [editarUsuario, setEditarUsuario] = useState(false);
    const [postsCount, setPostsCount] = useState(0);
    const [seguidoresCount, setseguidoresCount] = useState(0);
    const [siguiendoCount, setSiguiendoCount] = useState(0);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const [perfi, setPerfil] = useState([]);
    const [editePerfil, setEditePerfil] = useState({
        name: "",
        email: ""
    });

    const [seguidores, setSiguidores] = useState([]);

    //Instancia de Redux para escritura
    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setEditePerfil((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    }

    /////////////////    MI PERFIL     ///////////////////////
    useEffect(() => {
        const miPerfil = async () => {
            try {
                const perfil = await MyPerfil(token);
                setPerfil(perfil.data);

                setEditePerfil({
                    name: perfil.data.name,
                    email: perfil.data.email
                });
                // console.log("QUE PASSA PERFIL DIME", perfil)

            } catch (error) {
                console.log("Error en fetching profile:", error);
            }
        };
        miPerfil();
    }, [token]);

    ////////////////////////     FUNCIÓN PARA ABRIR POPUP DE EDITAR       /////////////////////////////////
    const editarUsuarioTogglePopup = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setEditePerfil({
            name: usuario.name,
            email: usuario.email
        });
        setEditarUsuario(true);
    }

    const cerrarPopupEdicion = () => {
        setEditarUsuario(false);
    }

    ////////////////////////////////////       MÉTODO ACTUALIZAR PERFIL    //////////////////////////////////////////
    const actualicarPerfilUsuario = async () => {
        try {
            const editar = await ActualizarMiPerfil(editePerfil, token);
            setEditePerfil({
                name: usuarioSeleccionado.name,
                email: usuarioSeleccionado.email
            })
            // console.log("EDITADO: ", editar);
        } catch (error) {
            console.log("Error al editar sus datos:", error);
        }
    }

    // const editarUsuarioTogglePopup = () => {
    //     setUsuario(!usuario);
    // };

    const miSeguidoresTogglePopup = () => {
        setMiSeguidores(!miSeguidores);
    };

    const seguidosPorMiTogglePopup = () => {
        setSeguidosPorMi(!seguidosPorMi);
    };


    ////////////////////    MÉTODO QUE TRAE LA CANTIDAD DE MIS POSTS     ///////////////////////
    useEffect(() => {
        const listaPosts = async () => {
            try {
                const postes = await ListarMisPosts(token)
                // setPages({ previous: postes.data.prev, next: postes.data.next })
                setPostsCount(postes)
                // console.log("QUE PASSA todos POST DIME", postes)
            } catch (error) {
                console.log("Error ", error);
            }
        }
        listaPosts();
    }, [token]);

    ////////////////////    MÉTODO QUE TRAE LA CANTIDAD DE MIS SEGUIDORES     ///////////////////////
    useEffect(() => {
        const listaSeguidore = async () => {
            try {
                const seguidorr = await ListaDeMisSeguidores(token)
                // setPages({ previous: postes.data.prev, next: postes.data.next })
                setseguidoresCount(seguidorr)

            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        listaSeguidore();
    }, [token]);

    /////////////////    MÉTODO QUE TRAE LA CANTIDAD DE USUARIOS QUE SIGO     ///////////////////////
    useEffect(() => {
        const losQeSigo = async () => {
            try {
                const sigo = await ListaDeSiguiendo(token);
                setSiguiendoCount(sigo);

            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        losQeSigo();
    }, [token])

    /////////////////    LISTAR DE MIS SEGUIDORES     ///////////////////////
    useEffect(() => {
        const misSeguidores = async () => {
            try {
                const seguidore = await ListaDeMisSeguidores(token);
                setSiguidores(seguidore.data);
            } catch (error) {
                console.log("Error en fetching seguidores:", error);
            }
        }
        misSeguidores();
    }, [token])

    useEffect(() => {
        const losQsigo = async () => {
            try {
                const usuariosQSigo = await ListaDeSiguiendo(token);
                setSeguidosPorMi(usuariosQSigo.data);
                console.log("QUE DIME", usuariosQSigo.data)
            } catch (error) {
                console.log("Error en fetching usuarios que sigo:", error);
            }
        }
        losQsigo();
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
                                        <button id="editar" className="btn btn-warning" onClick={() => editarUsuarioTogglePopup(perf)}>Editar<i id="btnIcon" className="bi bi-feather"></i></button>
                                        {
                                            editarUsuario && usuarioSeleccionado && (
                                                <div className="popup">
                                                    <button id="cerrar" onClick={() => cerrarPopupEdicion()}><i className="bi bi-file-excel"></i></button>
                                                    <CInput
                                                        type="name"
                                                        name="name"
                                                        placeholder=" name..."
                                                        value={editePerfil.name || ""}
                                                        changeEmit={inputHandler}
                                                    />

                                                    <CInput
                                                        type="email"
                                                        name="email"
                                                        placeholder=" enail..."
                                                        value={editePerfil.email || ""}
                                                        changeEmit={inputHandler}
                                                    />
                                                    <button type='button' id="btn-salvar" onClick={actualicarPerfilUsuario} className="btn btn-primary">Salvar<i id="btnIcon" className="bi bi-check2"></i></button>
                                                </div>


                                            )
                                        }
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos de perfil disponibles</p>
                            )}
                        </div>

                        <hr />
                        <div className="profile-right">
                            <div className="profile-posts">Publicaciones {postsCount.postsCount}</div>
                            <div className="containerPopup-Top">
                                <div onClick={miSeguidoresTogglePopup} className="profile-Seguidores">Seguidores {seguidoresCount.cantFollewer}</div>

                                {miSeguidores && (
                                    <div className="container-poup">
                                        <div className="popup">
                                            <button id="cerrar" onClick={miSeguidoresTogglePopup}><i className="bi bi-file-excel"></i></button>
                                            <h2>Vista Reducida SEGUIDORES</h2>
                                            <div className="popup-content">
                                                {
                                                    seguidores && seguidores.length > 0 ? (
                                                        <div>
                                                            {seguidores.map((segui) => (
                                                                <div key={segui._id} >
                                                                    <p className="datosUsuario">{segui.nameUser}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div>No hay datos de perfil disponibles</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="containerPopup-Button">
                                <div onClick={seguidosPorMiTogglePopup} className="profile-Siguiendo">Siguiendo {siguiendoCount.cantFollowin}</div>
                                {seguidosPorMi && (
                                    <div className="container-poup">
                                        <div className="popup">
                                            <button id="cerrar" onClick={seguidosPorMiTogglePopup}><i className="bi bi-file-excel"></i></button>
                                            <h2>Vista Reducida SEGUIDOS</h2>
                                            <div className="popup-content">
                                                {
                                                    seguidosPorMi && seguidosPorMi.length > 0 ? (
                                                        <div>
                                                            {seguidosPorMi.map((sigo) => (
                                                                <div key={sigo._id} >
                                                                    <p className="datosUsuario">{sigo.nameUserFollowers}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div>No hay datos de perfil disponibles</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profileMisPostes">
                    <Post />
                </div>

            </div >
        </>
    )
}