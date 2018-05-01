import React, { Component } from 'react';
import { getFoodItem } from '../../../../Utils/storeData';

class OrderItemName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    getFoodItem(this.props.id)
      .then(res => {
        this.setState({name: res.data.data.name});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>{this.state.name}</div>
    )
  }
}

export default OrderItemName;
