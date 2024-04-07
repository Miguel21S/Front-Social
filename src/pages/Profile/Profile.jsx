
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
// import { useEffect } from "react";

// import { profile } from "../../app/slices/cartSlice";
import { useDispatch } from 'react-redux';

export const Profile = () => {

    const navigate = useNavigate();
    //Instancia de Redux para escritura
    const dispatch = useDispatch();

    //Conectamos con Redux en modo lectura

    const rdxUser = useSelector(userData)

    // useEffect(()=>{
    //     if(!rdxUser.credentials.token){
    //         navigate("/")
    //     }
    // }, [rdxUser])

    return (
        <>
            <div className="profile-design">
                <div className="profile-wrapper">
                    <div className="profile-top">

                        <div className="userCreate">
                            <p><span>Usuario </span>Miguel</p>
                            <p><span>Creado </span> 06:04:2024</p>
                        </div>

                    </div>
                    <hr />
                    <div className="profile-button">
                        <p>Seguidores <span>1256.555</span></p>
                        <p>Siguiendo <span>1256.555</span></p>
                    </div>

                    <Link to='/'>
                        <h3 className="profile-myProfile">Profile</h3>
                    </Link>
                </div>

            </div>
        </>
    )
}