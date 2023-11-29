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

    getSusbs = async () => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETSUB}`, {
        method: "GET",
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const subs = await response.json();
          return subs
        }
      } catch (error) {
        throw error;
      }
    }

    removeSub = async (id) => {
      const accessToken = localStorage.getItem("access");

      const response = await fetch(`${BASE_API_URL}${API_ROUTER.DELETESUB}/${id}`,{
        method: "DELETE",
        headers:{
          Authorization: `Bearer ${accessToken}`
        },
      })

      try {
        if(response.status !== 200) throw response
        return await response.json()
      } catch (error) {
        throw error
      }
    }; 

    activateSub = async (id, data) => {
      const accessToken = localStorage.getItem("access");
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.ACTIVATESUB}${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(data),
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          return true
        }
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
}