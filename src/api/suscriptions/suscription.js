import { ENV } from "../../utils/constants";
import axios from 'axios';
const { BASE_API_URL, API_ROUTER } = ENV;

export class Suscription {

    async newSuscription(membershipId, membershipDuration, imageFile) {
      try {
        console.log(membershipId);
        console.log(imageFile);
        console.log(membershipDuration);
      
        const formData = new FormData();
        formData.append('membership_id', membershipId);
        formData.append('user_id', '650d43dbf9a6b95f725d0a43');
        formData.append('duration', membershipDuration);
        formData.append('voucher', imageFile);
      
        console.log(formData);
      
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
}