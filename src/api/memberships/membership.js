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
}