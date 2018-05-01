import axios from 'axios';
import serverAddress from './serverAddress';

export{getSignedUrl}
  function getSignedUrl(fileName, fileType,type){
    return axios.post(serverAddress + "/api/sign_s3/",{
      fileName: fileName,
      fileType: fileType,
      type : type
    })
  }

export{uploadFile}
  function uploadFile(destination,file,options){
    return axios.put(destination,file,options)
  }
