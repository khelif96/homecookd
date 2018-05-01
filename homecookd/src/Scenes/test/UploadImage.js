import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import { getSignedUrl, uploadFile } from "../../Utils/upload";
class UploadImage extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
/*  function UploadButton({label, onUpload, id}) {
  let fileInput = null;
  // If no id was specified, generate a random one
  const uid = id || Math.random().toString(36).substring(7);

  return (

  );
}
*/
handleUploadImage = (ev) => {
  ev.preventDefault();
  let file = this.uploadInput.files[0];
let fileParts = this.uploadInput.files[0].name.split(".")
let fileName = fileParts[0];
let fileType = fileParts[1];
getSignedUrl(fileName,fileType)
.then(response => {
  alert(JSON.stringify(response.data.data))
  var options = {
       headers: {
         'Content-Type': fileType
       }
     };
  uploadFile(response.data.data.returnData.signedRequest,file,options)
    .then(result => {
      alert(JSON.stringify(result));
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
})
.catch(error => {
  alert(error)
})
}
  render(){
    return(
      <div>
      <Label for="file">Open File</Label>
      <input onChange={this.handleUploadImage}ref={(ref) => { this.uploadInput = ref; }} type="file" />

      </div>
    )
  }
}
export default UploadImage;
