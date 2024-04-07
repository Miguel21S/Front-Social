
const root = "http://localhost:4999/api/";

export const RegisterUser = async (user) => {
  const options = {
    method: " POST ",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  console.log("USER: ", user);
  try {
    const response = await fetch(`${root}auth/register`, options)
    const data = await response.json();
    console.log("DATA ANTES DEL IF: ", data)
    if (!data.success) {
      throw new Error(data.message);
    }
    console.log("DATA DESPUES DEL IF: ", data)

    return data;
  } catch (error) {
    return error;
  }
}

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

export const ListarUsuarios = async (token) => {
  const options = {
    const: "GET",
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