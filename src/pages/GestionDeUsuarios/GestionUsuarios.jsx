
import { useEffect, useState } from 'react'
import './GestionUsuarios.css'
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom"
import { ListarUsuarios } from '../../services/rootss';

export const GestionUsuarios = () => {
    const navigate = useNavigate();
    const [usuariosSistema, setUsuariosSistema] = useState({});

    //Instancia de Redux para escritura
    //Conectamos con Redux en modo lectura
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;
    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    const inputHandler = (e, _id) => {
        const { name, value } = e.target;
        const updatedUsuarios = usuariosSistema.map(usuario => {
            if (usuario._id === _id) {
                return { ...usuario, [name]: value };
            }
            return usuario;
        });
        setUsuariosSistema(updatedUsuarios);
    };

    useEffect(() => {
        const listarUsuariosDeSistema = async () => {
            try {
                const usuarios = await ListarUsuarios(token);
                setUsuariosSistema(usuarios.data);
                console.log("LISTA DE USUARIOS", usuarios)
            } catch (error) {
                onsole.log("Error:", error);
            }
        }
        listarUsuariosDeSistema();
    }, [token])

    return (
        <>
            <div className="container-principal">
                <div className="profile-design">
                    <h2>Usuarios</h2>
                </div>

                <div className="tablaEditable">
                    {
                        usuariosSistema?.length > 0 ? (
                            <>
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuariosSistema.map((usuario) => (
                                            <tr key={usuario._id}>
                                                {/* <th>{usuario._id}</th> */}
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={usuario.name}
                                                        onChange={e => inputHandler(e, usuario._id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={usuario.email}
                                                        onChange={e => inputHandler(e, usuario._id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="role"
                                                        value={usuario.role}
                                                        onChange={e => inputHandler(e, usuario._id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </>
                        ) : (
                            <div>No hay usuarios disponibles</div>
                        )
                    }
                </div>
            </div >
        </>
    )
}