const SERVER_IP = 'http://localhost:3000/';

const API = "api/"
const API_VERSION = "v1/"

export const ENV = {
    BASE_API_URL: SERVER_IP + API + API_VERSION,
    //Encabezado rutas para almacenamiento, edicion, y eliminacion de archivos 
    BASE_URL: SERVER_IP,
    API_ROUTER:{
        LOGIN: "users/login",
        REGISTER: "users/signup",
        USERS: "users/",
        UPDATE: "users/update",
        ACTIVATE: "users/activate",
        FORGOT: "users/forgotpass",
        GETME: "users/auth/getme",
        DELETE: "users/delete",
        UPDATEADMIN: "users/admin/update",

        MEMBERSHIPS: "memberships/",
        SUSCRIPTIONS: "suscriptions/new-suscription",


        GETSUB: "suscriptions/",
        DELETESUB: "suscriptions/delete"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
}