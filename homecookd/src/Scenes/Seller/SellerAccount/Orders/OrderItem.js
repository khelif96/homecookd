import React, { Component } from 'react';
import { Divider, Button } from 'semantic-ui-react';
import { getOrderInfo, updateOrderStatus } from '../../../../Utils/storeData';
import StatusComplete from './OrderStatus/StatusComplete';
import StatusNotComplete from './OrderStatus/StatusNotComplete';
import OrderItemName from './OrderItemName';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      orderReceived: true,
      orderPrepping: false,
      outForDelivery: false,
      delivered: false
    }
    this.completeStatus = this.completeStatus.bind(this);
    this.updateOrderPrepping = this.updateOrderPrepping.bind(this);
    this.updateOutForDelivery = this.updateOutForDelivery.bind(this);
    this.updateDelivered = this.updateDelivered.bind(this);
  }

  updateOrderPrepping() {
    this.setState(
      {orderPrepping: true},
      () => {
        this.completeStatus();
      }
    );
  }

  updateOutForDelivery() {
    this.setState(
      {outForDelivery: true},
      () => {
        this.completeStatus();
      }
    );
  }

  updateDelivered() {
    this.setState(
      {delivered: true},
      () => {
        this.completeStatus();
      }
    );
  }

  completeStatus() {
    let api_token = this.props.api_token;
    let orderID = this.props.order;
    let orderStatus = {
      orderReceived: this.state.orderReceived,
      orderPrepping: this.state.orderPrepping,
      outForDelivery: this.state.outForDelivery,
      delivered: this.state.delivered
    }
    updateOrderStatus(api_token, orderID, orderStatus)
  }

  componentDidMount() {
    getOrderInfo(this.props.order)
      .then(res => {
        let data = res.data.data;
        this.setState({
          foodItems: data.foodItems,
          orderPrepping: data.orderStatus.orderPrepping,
          outForDelivery: data.orderStatus.outForDelivery,
          delivered: data.orderStatus.delivered
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        {this.state.foodItems.map((foodItem, i) =>
          <OrderItemName key={i} id={foodItem}/>
        )}
        <div>
          <div>
            Order Received:
            {this.state.orderReceived  ? (
              <StatusComplete />
            ) : (
              <span><StatusNotComplete /></span>
            )}
          </div>
          <div>
            Order Preparing:
            {this.state.orderPrepping ? (
              <StatusComplete />
            ) : (
              <span>
                <StatusNotComplete />
                <Button onClick={this.updateOrderPrepping} positive size='tiny' content='Complete' />
              </span>
            )}
          </div>
          <div>
            Out For Delivery:
            {this.state.outForDelivery ? (
              <StatusComplete />
            ) : (
              <span>
                <StatusNotComplete />
                <Button onClick={this.updateOutForDelivery} positive size='tiny' content='Complete' />
              </span>
            )}
          </div>
          <div>
            Delivered:
            {this.state.delivered ? (
              <StatusComplete />
            ) : (
              <span>
                <StatusNotComplete />
                <Button onClick={this.updateDelivered} positive size='tiny' content='Complete' />
              </span>
            )}
          </div>
        </div>
        <Divider segment/>
      </div>
    )
  }
}

export default OrderItem;
