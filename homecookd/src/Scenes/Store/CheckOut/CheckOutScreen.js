import React, { Component } from 'react';
import history from '../../../Utils/history';
import { Button, Modal, Item } from 'semantic-ui-react';
import CheckOutItem from './CheckOutItem';
import { connect } from 'react-redux';
import { clearCart } from '../../../actions/cartActions';
import { createOrder } from '../../../Utils/storeData';

class CheckOutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_api_token: ''
    };

    this.getUserApiToken = this.getUserApiToken.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }
  getUserApiToken() {
    if(localStorage.getItem('api_token') !== null) {
      return localStorage.getItem('api_token');
    } else {
      // redirect to login page if user is not logged in
      history.push('/Auth/Login');
    }
  }

  checkOut() {
    if(this.props.cart.cart.length === 0) {
      return;
    }
    let user_api_token = this.getUserApiToken();
    let seller_id = this.props.seller_id;
    let foodItems = this.props.cart.cart;
    createOrder(user_api_token, seller_id, foodItems)
      .then(res => {
        this.clearCart();
        this.props.handleClose();
      })
      .catch(err => {
        console.log(err);
      })
  }

  clearCart() {
    this.props.clearCart();
  }

  state = { open: false }
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {
    return (
      <Modal open={this.props.open} >
        <Modal.Content scrolling>
          <Item.Group relaxed divided unstackable>
            {
              this.props.cart.cart.map((order, i) =>
                <CheckOutItem key={i} orderId={order} />
              )
            }
          </Item.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.handleClose} negative>
            Exit
          </Button>
          <Button onClick={this.checkOut} positive icon='checkmark' labelPosition='right' content='Check Out' />
        </Modal.Actions>
      </Modal>
    )
  }
}


const mapStateToProps = (reduxState) => {
  return{
    cart: reduxState.cart
  }
}

const mapDispatchToProps = {
  clearCart: clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen);
