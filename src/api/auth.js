import { ENV } from "../utils/constants";
const { BASE_API_URL, API_ROUTER } = ENV;

export class Auth{
    //Registro
    register = async (data) => {
        console.log(data);
        console.log("Hola");
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.REGISTER}`, {
          mode: 'no-cors',
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(data),
        });
        try {
          if (response.status !== 201) {
            throw new Error("Error al crear usuario");
          }
        } catch (error) {
          throw error;
        }
      };

    //Autenticacion 
    //Obtener Usuario logeado 
}