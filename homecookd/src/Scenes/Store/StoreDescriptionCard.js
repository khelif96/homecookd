import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

class StoreDescripitionCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:{
        first :"",
        last : ""
      }

    };
  }

  componentDidMount(){
  }
  render(){
    const align = {
      marginLeft: 20,
      display: 'flex',

    }

    const extra = (
      <a>
        <Icon name='circle' />
        Now Open
      </a>
    )
    const edit = (
      <a onClick={this.handleClose} href="/SellerProfileEdit">
      <Icon name ='edit' />
      Edit Profile
      </a>
    )
    return(
      <div style={align}>
      <Card
        raised="true"
        image='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg'
        edit={edit}
        header={this.props.name.first + "'s Store"}
        description='About the chef:'
        extra={extra}>
      </Card>
      </div>
    )
  }
}
export default StoreDescripitionCard;
