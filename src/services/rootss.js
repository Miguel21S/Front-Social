
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
    const response = await fetch(`${root}posts`, options);
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
export const CrearPost = async (token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  }

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