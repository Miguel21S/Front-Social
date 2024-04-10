
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
// import { useEffect } from "react";

// import { profile } from "../../app/slices/cartSlice";
import { useDispatch } from 'react-redux';
import { ListaDeMisSeguidores, ListaDeSiguiendo, ListarMisPosts, MyPerfil } from "../../services/rootss";
import { useEffect, useState } from "react";

export const Profile = () => {

    const [perfi, setPerfil] = useState({});
    const [posts, setPosts] = useState({});
    const [siguiendo, setSiguiendo] = useState({});
    const [siguidores, setSiguidores] = useState({});

    const [activeTab, setActiveTab] = useState("London");

    const openCity = (cityName) => {
        setActiveTab(cityName);
    };

    const navigate = useNavigate();
    //Instancia de Redux para escritura
    const dispatch = useDispatch();

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
        const fetchData = async () => {
            try {
                const perfil = await MyPerfil(token);
                setPerfil(perfil.data);
                console.log("QUE PASSA PERFIL DIME", perfil)

            } catch (error) {
                console.log("Error en fetching profile:", error);
            }
        };
        fetchData();
    }, [token]);

    /////////////////    LISTAR MIS POSTS     ///////////////////////
    useEffect(() => {
        const misPosts = async () => {
            try {
                const posts = await ListarMisPosts(token);
                setPosts(posts);
                console.log("QUE PASSA POST DIME", posts)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        misPosts();
    }, [token])

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
                            <div className="profile-Seguidores">Seguidores 1256.555</div>
                            <div className="profile-Siguiendo">Siguiendo 1256.555</div>
                        </div>

                        {/* <Link to='/'>
                        <h3 className="profile-myProfile">Profile</h3>
                    </Link> */}
                    </div>

                </div>

                <div className="profileMisPostes">
                    <h2>Tabs</h2>
                    <p>Click on the buttons inside the tabbed menu:</p>

                    <div className="tab">
                        <button
                            className={activeTab === "London" ? "tablinks active" : "tablinks"}
                            onClick={() => openCity("London")}
                        >
                            London
                        </button>
                        <button
                            className={activeTab === "Paris" ? "tablinks active" : "tablinks"}
                            onClick={() => openCity("Paris")}
                        >
                            Paris
                        </button>
                        <button
                            className={activeTab === "Tokyo" ? "tablinks active" : "tablinks"}
                            onClick={() => openCity("Tokyo")}
                        >
                            Tokyo
                        </button>
                    </div>

                    <div id="London" className="tabcontent" style={{ display: activeTab === "London" ? "block" : "none" }}>
                        <h3>London</h3>
                        <p>London is the capital city of England.</p>
                    </div>

                    <div id="Paris" className="tabcontent" style={{ display: activeTab === "Paris" ? "block" : "none" }}>
                        <h3>Paris</h3>
                        <p>Paris is the capital of France.</p>
                    </div>

                    <div id="Tokyo" className="tabcontent" style={{ display: activeTab === "Tokyo" ? "block" : "none" }}>
                        <h3>Tokyo</h3>
                        <p>Tokyo is the capital of Japan.</p>
                    </div>
                </div>
            </div>
        </>
    )
}