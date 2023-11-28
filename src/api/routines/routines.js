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

    async getAllListRoutines(){
      const accessToken = localStorage.getItem("access");
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETLIST}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
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

      async getRoutine(routineId){
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETROUTINE}${routineId}`,{
          method: "GET"
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

      async getTraining(trainingId){
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETTRAINING}${trainingId}`,{
          method: "GET"
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

      async finishRoutine(routineId){
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.FINISHROUTINE}${routineId}`,{
          method: "PATCH"
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

      async createTrainingInfo(trainingInfo){
        const accessToken = localStorage.getItem("access");
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.CREATETRAININGINFO}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(trainingInfo),
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