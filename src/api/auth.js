import { ENV } from "../utils/constants";
const { BASE_API_URL, API_ROUTER } = ENV;

export class Auth{
    //Registro
    register = async (data) => {
        const response = await fetch(`${BASE_API_URL}${API_ROUTER.REGISTER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(data),
        });
        try {
          if (response.status !== 201) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }else{
            const responseData = await response.json();
            return responseData._id
          }
        } catch (error) {
          throw error;
        }
    };

    //Autenticacion 
    login = async (data) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const { access } = await response.json();
          localStorage.setItem(ENV.JWT.ACCESS, access)
        }
      } catch (error) {
        throw error;
      }
    };

    update = async (data, token) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.UPDATE}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
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
    };

    getUserById = async (userId) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.USERS}/${userId}`, {
        method: "GET",
      });
      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const user = await response.json();
          return user
        }
      } catch (error) {
        throw error;
      }
    }
  
    activateAccount = async (token) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.ACTIVATE}`,{
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
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

    forgotpass = async (identification) => {
      const response = await fetch(`${BASE_API_URL}${API_ROUTER.FORGOT}/${identification}`,{
        method: "POST",
      })

      try {
        if (response.status !== 200) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }else{
          const message = await response.json();
          return message
        }
      } catch (error) {
        throw error;
      }

    }

    getAccessToken = () => {
      return localStorage.getItem("access");
    };

    getMe = async () => {
      const accessToken = this.getAccessToken();

      const response = await fetch(`${BASE_API_URL}${API_ROUTER.GETME}`,{
        method: "GET",
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
}