import React, { Component } from 'react';
import {Modal,Button,Image,Header, Input,Label, Icon, Dropdown} from 'semantic-ui-react'
import {newFoodItem} from '../../../../Utils/storeData';

class NewMenuItemModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      itemName:'',
      priceDollar:0,
      description : ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSaveFoodItem = this.handleSaveFoodItem.bind(this);

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
    price : this.state.priceDollar,
    description : this.state.description
  }

    newFoodItem(localStorage.getItem('api_token'),foodItem)
      .then(response => {
          alert(JSON.stringify(response.data));
          window.location.reload();
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })

    e.preventDefault();

}

  render(){
    return(
      <Modal trigger={ <Dropdown item icon='plus' simple onClick={this.handleOpen}  closeOnEscape={this.handleClose}/>} open={this.state.modalOpen}>
   <Modal.Header>Edit {this.state.itemName}</Modal.Header>
   <Modal.Content image>
     <Image wrapped size='medium' src='https://image.freepik.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_318-61086.jpg' />
     <Modal.Description>
       <Header><Input value={this.state.itemName} onChange={this.handleFormChange} name='itemName'  transparent placeholder='Name of this item' /></Header>
       <Input style={{ width:500}} transparent onChange={this.handleFormChange} name='description' placeholder='Describe your item' />
       <br/>

       <Input style={{paddingTop: 200,width:80,float:'right'}} onChange={this.handleFormChange} name="priceDollar" value={this.state.priceDollar} labelPosition='right' type='text' placeholder='Price'>
       <Label basic>$</Label>
       <input />

       </Input>
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
export default NewMenuItemModal;
