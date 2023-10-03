import { ENV } from "../utils/constants";
const { BASE_API_URL, API_ROUTER } = ENV;

export class Auth{
    //Registro
    register = async (data) => {
        console.log(data);
        console.log("Hola");
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.REGISTER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(data),
        });
        console.log(response.statusText)
        try {
          if (response.status !== 201) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }
        } catch (error) {
          throw error;
        }
      };

    //Autenticacion 
    //Obtener Usuario logeado 
}