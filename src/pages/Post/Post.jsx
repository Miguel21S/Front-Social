
import "./Post.css"
import React, { useEffect, useState } from 'react'
import { ListarMisPosts } from "../../services/rootss";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";


export const Post = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Posts");
    const [posts, setPosts] = useState([]);

    const openCity = (cityName) => {
        setActiveTab(cityName);
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
    return (
        <>
            <div className='postContainer'>
                <div className="profileMisPostes">
                    <h2>Tabs</h2>
                    <p>Click on the buttons inside the tabbed menu:</p>

                    <div className="tab">
                        <button
                            className={activeTab === "Posts" ? "tablinks active" : "tablinks"}
                            onClick={() => openCity("Posts")}
                        >
                            PUBLICACIONES
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

                    <div id="Posts" className="tabcontent" style={{ display: activeTab === "Posts" ? "block" : "none" }}>
                        <h3>Posts</h3>
                        <div className="row">
                            {
                                posts?.length > 0 ? (
                                    posts.map((post) => (
                                        <div className="col-md-3" key={post._id}>
                                            <div className="card mb-4 h-100">
                                                <img src="..." className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{post.userName}</h5>
                                                    <p className="card-text">{post.title}</p>
                                                    <p className="card-text">{post.tests.length > 50 ? post.tests.substring(0, 50) + "..." : post.tests}</p>

                                                    <a href="#" className="btn btn-primary">Go somewhere</a>
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
