import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import "./SellerProfileEdit.css"
import {UpdateSellerInfo} from "../../../Utils/Sellers"
import {getSellerInfo} from "../../../Utils/Sellers"


import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class ProfileEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      restaurant:'',
      email: '',
      address:'',
      city:'',
      state:'',
      zip:'',
      time:''

    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.HandleFormSubmission = this.HandleFormSubmission.bind(this);

  }
  handleFormChange(e){
       const value = e.target.value;
       const name = e.target.name;
       this.setState({[name]: value})
   }

  HandleFormSubmission(e){
    const name = this.state.name;
    const restaurant = this.state.restaurant;
    const email = this.state.email;
    const address = this.state.address;
    const city = this.state.city;
    const state = this.state.state;
    const zip = this.state.zip;
    // const Time = this.state.Time;

    const requestBody = {
      name, restaurant, email, address, city, state, zip
    }

    UpdateSellerInfo(localStorage.getItem('api_token'),requestBody)
    .then(response => {
      alert("Response " + JSON.stringify(response))
    })
    .catch(error => {
      alert("Error " + JSON.stringify(error))
    })
    e.preventDefault();
  }

  componentDidMount() {
    getSellerInfo()
      .then(res => console.log(res))
  }

  render() {

    return (
    <div style={{padding: 150}}>
<center><h2>Edit Account Page</h2></center>
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Name:</Table.Cell>
        <Table.Cell><TextField name="Name" value = {this.state.Name}autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Restaurant Name:</Table.Cell>
        <Table.Cell><TextField name="Restaurant" value = {this.state.Restaurant} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Time:</Table.Cell>
        <Table.Cell><TextField name="Time" value = {this.state.Time} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Email:</Table.Cell>
        <Table.Cell><TextField name="Email" value = {this.state.Email} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Address:</Table.Cell>
        <Table.Cell><TextField name="Address" value = {this.state.Address} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>City:</Table.Cell>
        <Table.Cell><TextField name="City" value = {this.state.City} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>State:</Table.Cell>
        <Table.Cell><TextField name="State" value = {this.state.State} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>

      <Table.Row>
        <Table.Cell>Zip:</Table.Cell>
        <Table.Cell><TextField name="Zip" value = {this.state.Zip} autoFocus
          onChange={this.handleFormChange}
        /></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

  <Button content='Submit' onClick = {this.HandleFormSubmission}/>
    </div>
    )
  }
}


export default ProfileEdit;
