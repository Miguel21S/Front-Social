
<img src="./src/img/pri.jpeg">


---

<ul>

<li><a href="#tecnologías">Technologies</a> </li>

<li> <a href="#urls">URLs</a> </li>

<li> <a href="#estructura-y-diseño-de-la-base-de-datos">Estructura y diseño de la base de datos</a> </li>

<li> <a href="#vista-de-la-aplicación">Vista de la Aplicación</a> </li>
<li> <a href="#futuras-funcionalidades">Futuras Funcionalidades</a></li>
<li> <a href="#author">Author</a> </li>

</ul>

---

## Technologies


<a href="https://www.docker.com/"><img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
alt="Docker"></a>
<a href="https://www.mongodb.com/es"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
alt="MySqls"/> </a>
<a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/NodeJs-339933?style=for-the-badge&logo=Node.js&logoColor=white"
alt="Nodejs" /></a>
<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-335933?style=for-the-badge&logo=express&logoColor=white"
alt="Express" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
alt="TypeScript" /></a>
<a href="https://github.com/Miguel21S"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GITHUB" /></a>
<a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" /></a>
<a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" alt="POSTMAN" /></a>
<a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM"></a>
<a href=""><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"></a>
<a href=""><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"></a>
<a href="https://es.react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></a>

---
## Description
El proyecto consiste en desarrollar una red social en la que se pueder registrarse, acceder a la red e interactuar con otros usuarios del sistema.

Para este repositorio se creara un app de parte del cliente que se conectara con la app del servidor.

Para esto se debe cumplir creando las funcionalidades de los siguientes rutas.

## URLs

Autenticación

| Método | URI | Acción | Extra |
| --- | --- | --- |---|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Loguear usuario |

Usuarios

| Método | URI | Acción | Extra |
| --- | --- | --- |---|
| GET | /api/users | Listar todos los usuarios (super_admin) |
| GET | /api/users/profile | Modificar los datos del perfil |
| PUT | /api/users/profile | Actualizar datos del perfil |
| DELETE | /api/users/{id} | Delete user (super_admin)--- | Si |

Publicar

| Método | URI | Acción | Extra |
| --- | --- | --- |---|
| POST | /api/posts | Crear publicación |
| DELETE | /api/posts/{id} | Eliminar publicación por id |
| PUT | /api/posts | Actualizar publicación por id |
| GET | /api/posts/own | Recuperar mis publicaciones  |
| GET | /api/posts | Ver todos los posts |

Megusta

| Método | URI | Acción | Extra |
| --- | --- | --- |---|
| PUT | /api/posts/like/{id} | Dar megusta y eliminar me gusta |

Seguidores

| Método | URI | Acción | Extra |
| --- | --- | --- |---|
| GET | /users/following | Lista mis seguidores  | Si |
| GET | /users/followers | Lista usuarios que sigo  | Si |

El proyecto se encuentra en estado de construicción, a pesar de cumplir con todos los requisitos exigidos y algunos extras.

## Estructura y diseño de la base de datos

<img src="./src/img/bd.png" alt="Model de bd">

## Vista de la Aplicación

- Vista de regidtro

<img src="./src/img/mongoose.png" alt="Registro">

- Vista de login

<img src="./src/img/mongoose.png" alt="Login">

- Vista Principal

<img src="./src/img/principal_3.png" alt="Principal">

- Vista de Perfil

<img src="./src/img/perfil_5.png" alt="Perfil">

- Vista de Editar Publicación

<img src="./src/img/editarPost_4.png" alt="Editar Publicación">

## Futuras Funcionalidades

Se crearán las funcionalidades de seguir y dejar de seguir un usuario, comentar las publicaciones, y subir imagenes. 

## Author:

Name: Miguel Bengui