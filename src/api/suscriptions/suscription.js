import { ENV } from "../../utils/constants";
import axios from 'axios';
const { BASE_API_URL, API_ROUTER } = ENV;

export class Suscription {

    async newSuscription(userId, membershipId, membershipDuration, imageFile) {
      try {
        const formData = new FormData();
        formData.append('membership_id', membershipId);
        formData.append('user_id', userId);
        formData.append('duration', membershipDuration);
        if(imageFile !== null){
          formData.append('voucher', imageFile);
        }
      
        const response = await axios.post(`${BASE_API_URL}${API_ROUTER.SUSCRIPTIONS}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        if (response.status === 201) {
          const data = response.data;
          return data;
        } else {
          throw new Error('Error al enviar datos al servidor');
        }
      } catch (error) {
        console.error('Error en la solicitud Axios:', error);
        throw error;
      }
    }

    getSubById = async (subId) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETSUB}${subId}`, {
        method: "GET",
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const sub = await response.json();
          return sub
        }
      } catch (error) {
        throw error;
      }
    }
}