import React, { Component } from 'react';
import { Item, Button } from 'semantic-ui-react';
import { getFoodItem } from '../../../Utils/storeData';
import { connect } from 'react-redux';
import { removeCart } from '../../../actions/cartActions';

class CheckOutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      image: '',
      sellerId: ''
    }
  }

  removeFromCart(id) {
    this.props.removeFromCart(id);
  }

  componentDidMount() {
    getFoodItem(this.props.orderId)
      .then(res => {
        let data = res.data.data;
        this.setState({
          name: data.name,
          price: data.price,
          image: data.images,
          sellerId: data.seller_id
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Item>
        <Item.Image size='small' src='http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18143835/fc71iy049-02-main.jpg' />
        <Item.Content verticalAlign='middle'>
          <Item.Header>{this.state.name}</Item.Header>
          <Item.Description>${this.state.price}</Item.Description>
          <Item.Extra>
            <Button floated='right' negative onClick={() => this.removeFromCart(this.props.orderId)}>
              Cancel Item
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

const mapDispatchToProps = {
  removeFromCart: removeCart
}

export default connect(null, mapDispatchToProps)(CheckOutItem);
