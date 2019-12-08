import React, { Component } from 'react';
import SellerInfoCard from '../SellerAccount/Info';
import OrderList from './Orders/OrderList';

import MenuItemBox from './MenuItems/MenuItemBox';
class SellerAccount extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

  }
  render(){
    return(
      <div>

        <header>
          <center><h1>Welcome</h1></center>
        </header>

        <center>
           <SellerInfoCard style={{backgroundColor:'red'}}/>
        </center>

        <h1 style={{margin:50}}>Orders</h1>
        <OrderList />
        <MenuItemBox style={{margin:50}}/>

        <br/><br/><br/>
        {/* <ButtonExampleSocial/>*/}
      </div>
    )
  }
}
export default SellerAccount;
