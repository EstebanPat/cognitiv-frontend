import { ENV } from "../../utils/constants";
const { BASE_API_URL, API_ROUTER } = ENV;

export class Routines{

    async createRoutines(token){
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.CREATEROUTINES}`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        try {
            if (response.status !== 200) {
              const errorData = await response.json();
              throw new Error(errorData.error);
            }else{
              const msessage = await response.json();
              return msessage
            }
          } catch (error) {
            throw error;
          }
    }
}