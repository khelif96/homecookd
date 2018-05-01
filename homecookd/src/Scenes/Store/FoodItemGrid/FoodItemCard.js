import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart } from '../../../actions/cartActions';


class FoodItemCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      foodItemName : this.props.foodItemName,
      openMagnify : false
    };
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart = (id) => {
    this.props.addToCart(id);
  }

  render(){
    return(
      <Card
        onClick={this.props.onClick}
        raised
        image={'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18143835/fc71iy049-02-main.jpg'}
        description={this.state.foodItemName}
        extra={<Button onClick={() => this.addToCart(this.props.id)} positive content='Add to Cart' size='mini' />}
      />
    )
  }
}

const mapDispatchToProps = {
  addToCart: addCart
}

export default connect(null, mapDispatchToProps)(FoodItemCard);
