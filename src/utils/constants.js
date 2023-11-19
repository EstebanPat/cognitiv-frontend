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
        MEMBERSHIPS: "memberships/",
        SUSCRIPTIONS: "suscriptions/new-suscription",
        UPDATE: "users/update",
        ACTIVATE: "users/activate",
        FORGOT: "users/forgotpass",
        GETME: "users/auth/getme",

        GETSUB: "suscriptions/",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
}