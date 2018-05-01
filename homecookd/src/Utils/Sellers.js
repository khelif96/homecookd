import axios from 'axios';
import serverAddress from './serverAddress';

export {getSellers};
  function getSellers(){
    return axios.get(serverAddress + "/api/seller/sellers")
    }

export{UpdateSellerInfo}
    function UpdateSellerInfo(api_token, requestBody){
      return axios.post(serverAddress + '/api/update/account/seller', {api_token : api_token, requestBody})
    }

export{getSellerInfo}
  function getSellerInfo(api_token){
    return axios.post(serverAddress + '/api/auth/information/seller',{api_token: api_token})
  }
