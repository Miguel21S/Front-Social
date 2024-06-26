
const root = "http://localhost:4999/api/";

////////////////  RUTA REGISTRARSE  /////////////////////////////
export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/register`, options)
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}


////////////////  RUTA LOGIN  /////////////////////////////
export const loginService = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

////////////////  RUTA LISTAR USUARIOS  /////////////////////////////
export const ListarUsuarios = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(`${root}users`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA PERFIL  /////////////////////////////
export const MyPerfil = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${root}users/profile`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;

  }
}

export const ActualizarMiPerfil = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${root}users/profile`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }

}

//////////////////////   RUTA ELIMINAR USUARIO  (NO FUNCIONA AÚN)   //////////////////////////////
export const EliminarUsuario = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${root}users/${id}`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}
////////////////  RUTA DE TODOS LOS POSTS  /////////////////////////////
export const ListaDePosts = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(`${root}posts/like/listAllPostsWithLikes`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA DE MIS POSTS  /////////////////////////////
export const ListarMisPosts = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(`${root}posts/own`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA DE USUARIOS QUE SIGO  /////////////////////////////
export const ListaDeSiguiendo = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }

  try {
    const response = await fetch(`${root}users/followers`, options);
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA DE MIS SEGUIDORES  /////////////////////////////
export const ListaDeMisSeguidores = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }

  try {
    const response = await fetch(`${root}users/following`, options);
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA DE CREAR POST  /////////////////////////////
export const CrearPost = async (data, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${root}posts`, options)
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA DE EDITAR POST  /////////////////////////////
export const UpdatePost = async (postId, data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}posts/${postId}`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

////////////////  RUTA DE ELIMINAR POST  /////////////////////////////
export const eliminarPost = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${root}posts/${id}`, options);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}

////////////////  RUTA PARA DAR LIKE EN UN POST /////////////////////////////
export const Likes = async (id, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({postId: id }),
  };
  console.log("TOKEN DEL LIKE: ", id)
  try {
    const response = await fetch(`${root}posts/like/${id}`, options)
    console.log("RESPONSE: ", response)
    const data = await response.json();
    console.log("DATA: ", data)

    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
}