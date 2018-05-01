import React, { Component } from 'react';
import { getOrders } from '../../../../Utils/storeData';
import { Segment } from 'semantic-ui-react';
import OrderItem from './OrderItem';
import './OrderList.css';

const orderListSegmentStyle = {
  backgroundColor: 'rgb(247, 247, 247)'
}

class OrderList extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: [],
      api_token: ''
    };

    this.getApiToken = this.getApiToken.bind(this);
  }

  getApiToken() {
    const api_token = localStorage.getItem('api_token');
    if(api_token) {
      this.setState({api_token});
      return api_token;
    }
  }

  componentDidMount() {
    let api_token = this.getApiToken();

    getOrders(api_token)
    .then(res => {
      this.setState({orders: res.data.orders});
    })
  }

  render() {
    return (
      <div className="orderListStyle">
        <Segment style={orderListSegmentStyle}>
          {
            this.state.orders.map((order, i) =>
              <OrderItem api_token={this.state.api_token} className="itemStyle" key={i} order={order}/>
            )
          }
        </Segment>
      </div>
    )
  }
}

export default OrderList;
