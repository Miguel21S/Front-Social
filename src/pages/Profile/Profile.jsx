
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
// import { useEffect } from "react";

// import { profile } from "../../app/slices/cartSlice";
import { useDispatch } from 'react-redux';
import { ListarMisPosts } from "../../services/rootss";
import { useEffect, useState } from "react";

export const Profile = () => {
    const { token } = useSelector(userData)


    const navigate = useNavigate();
    //Instancia de Redux para escritura
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    //Conectamos con Redux en modo lectura

    const rdxUser = useSelector(userData)

    // useEffect(()=>{
    //     if(!rdxUser.credentials.token){
    //         navigate("/")
    //     }
    // }, [rdxUser])
    useEffect(() => {
        const misPosts = async () => {
            try {
                const posts = await ListarMisPosts(token);
                setUser(posts);
                console.log("QUE PASSA POST DIME", posts)
            } catch (error) {
                console.log("Error en fetching users:", error);
            }
        }
        misPosts();
    }, [token])


    return (
        <>
            <div className="container-principal">
                <div className="profile-design">
                    <div className="profile-wrapper">
                        <div className="profile-left">
                            <p>Usuario Miguel</p>
                            <p>Perfil</p>
                        </div>

                        <hr />
                        <div className="profile-right">
                            <div className="profile-Seguidores">Seguidores 1256.555</div>
                            <div className="profile-Siguiendo">Siguiendo 1256.555</div>
                            <div className="profile-posts">Posts 1256.555</div>
                        </div>

                        {/* <Link to='/'>
                        <h3 className="profile-myProfile">Profile</h3>
                    </Link> */}
                    </div>

                </div>
            </div>
        </>
    )
}