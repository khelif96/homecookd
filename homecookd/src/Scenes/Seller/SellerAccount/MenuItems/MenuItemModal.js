import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import {Modal,Button,Image,Header, Input, Icon} from 'semantic-ui-react'
import {updateFoodItem} from '../../../../Utils/storeData';

import {getSignedUrl,uploadFile} from '../../../../Utils/upload';
class MenuItemModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      itemName:this.props.food.name,
      price: this.props.food.price,
      description : this.props.food.description,
      imgUrl: this.props.food.image
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSaveFoodItem = this.handleSaveFoodItem.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleFormChange(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value});
  }


  handleSaveFoodItem(e){
    var foodItem = {
      itemName : this.state.itemName,
      price : this.state.price,
      description : this.state.description,
      image: this.state.imgUrl
    }

    updateFoodItem(localStorage.getItem('api_token'), this.props.food._id,foodItem)
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      alert(JSON.stringify(error.data));
    })

    e.preventDefault();

  }

  onDrop(files){
    const file = files[0];
    const fileName = file.name.split('.')[0];
    const fileType = file.name.split('.')[1];
    const type = 'menu-img';
    getSignedUrl(fileName,fileType,type)
    .then(response => {
      let returnData = response.data.data.returnData;
      var options = {
           headers: {
             'Content-Type': fileType
           }
         };
         alert(response.data);

      uploadFile(returnData.signedRequest,file,options)
      .then(response => {
        this.setState({imgUrl : returnData.url});
      })
      .catch(error => {
        alert("Error while uploading")
      })
    })
    .catch(error => {
      alert(error);
    })
  }

  render(){
    return(
      <Modal trigger={<Button  tooltip="edit" floated="right" onClick={this.handleOpen}  closeOnEscape={this.handleClose}><Icon color='green' name="edit"/> </Button>} open={this.state.modalOpen}>
        <Modal.Header>Edit {this.state.itemName}</Modal.Header>
        <Modal.Content image>
          <Dropzone onDrop={this.onDrop}>
            <Image wrapped size='medium' src={this.state.imgUrl} />
          </Dropzone>
          <Modal.Description>
            <Header><Input value={this.state.itemName} onChange={this.handleFormChange} name='itemName'  transparent placeholder='Name of this item' /></Header>
            <Input style={{ width:500}} name='description' onChange={this.handleFormChange} value={this.state.description} transparent placeholder='Describe your item' />
            <br/>

            <Input size='tiny' style={{paddingTop: 200,width:80}} onChange={this.handleFormChange} name="price" value={this.state.price} label='$'  type='text' placeholder='Price'/>


          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} color='red'>
            <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={this.handleSaveFoodItem}>
              <Icon name='checkmark' /> Save
              </Button>
            </Modal.Actions>
          </Modal>

        )
      }
    }
    export default MenuItemModal;
