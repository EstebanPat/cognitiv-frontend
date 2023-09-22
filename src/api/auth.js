import { ENV } from "../utils";
const { BASE_API_URL, API_ROUTES } = ENV;

export class Auth{
    //Registro
    signup = async (data) => {
        const response = await fetch(`${BASE_API_URL}${API_ROUTES.AUTH}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
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