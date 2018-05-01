import axios from 'axios';
import serverAddress from './serverAddress';

export {registerCustomer};
  function registerCustomer(email,userName,password, firstName, lastName){
    return axios.post(serverAddress + "/api/auth/register/user", {
      email: email,
      userName: userName,
      password: password,
      name: {
        first: firstName,
        last: lastName
      }
    })
    // .then(response => response.data.api_token)
    // .catch(error => error);
  }

  export {registerSeller};
    function registerSeller(email,userName,password, firstName, lastName,businessName){
      return axios.post(serverAddress + "/api/auth/register/seller", {
        email: email,
        userName: userName,
        password: password,
        name: {
          first: firstName,
          last: lastName
        },
        businessName : businessName
      })
      // .then(response => response.data.api_token)
      // .catch(error => error);
    }

    export {loginSeller};
      function loginSeller(email,password){
        return axios.post(serverAddress + "/api/auth/login/seller", {
          email: email,
          password: password
        })
        // .then(response => response.data.api_token)
        // .catch(error => error);
      }

  export {loginCustomer};
    function loginCustomer(email,password){
      return axios.post(serverAddress + "/api/auth/login/user", {
        email: email,
        password: password
      })
      }
      // .then(response => response.data.api_token)
      // .catch(error => error);
