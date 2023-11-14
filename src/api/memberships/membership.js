import { ENV } from "../../utils/constants";
const { BASE_API_URL, API_ROUTER } = ENV;

export class Membership{

  async getAll(){
      try {
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.MEMBERSHIPS}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de membresías');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener las membresías:', error);
        throw error;
      } 
  }

  async getMembById(membId){
    const response = await fetch(`${BASE_API_URL}${API_ROUTER.MEMBERSHIPS}/${membId}`, {
      method: "GET",
    });
    try {
      if (response.status !== 200) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }else{
        const memb = await response.json();
        return memb
      }
    } catch (error) {
      throw error;
    }
  }
}