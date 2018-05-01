import axios from 'axios';
import serverAddress from './serverAddress';

  export {loginAdmin};
    function loginAdmin(email,password){
      return axios.post(serverAddress + "/sudoApi/auth/admin/login", {
        email: email,
        password: password
      })
      }
      // .then(response => response.data.api_token)
      // .catch(error => error);
  export {getUsers};
    function getUsers(api_token){
      return axios.post(serverAddress + "/sudoApi/admin/getUsers", {
        api_token: api_token
      })
      }
  export {getSellers};
    function getSellers(api_token){
      return axios.post(serverAddress + "/sudoApi/admin/getSellers", {
        api_token: api_token
      })
      }

  export{approveSeller};
    function approveSeller(api_token,seller_id){
      return axios.post(serverAddress + "/sudoApi/admin/approveSeller",{
        api_token: api_token,
        seller_id: seller_id
      })
    }

    export{rejectSeller};
      function rejectSeller(api_token,seller_id){
        return axios.post(serverAddress + "/sudoApi/admin/rejectSeller",{
          api_token: api_token,
          seller_id: seller_id
        })
      }
