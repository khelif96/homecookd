import React, { Component } from 'react';
import FoodItemGrid from './FoodItemGrid/FoodItemGrid';
import CheckOut  from './CheckOut/CheckOut';
import SearchExampleStandard from './StoreSearchBar';

import StoreDescriptionCard from './StoreDescriptionCard';

import {getStoreInfoByID} from '../../Utils/storeData'

class StorePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      storeData: {
        name: {
          first : "",
          last : ""
        }
      },
      seller_id: ''
    };
  }
  componentDidMount(){
    getStoreInfoByID(this.props.match.params.sellerID)
    .then(response => {
      this.setState({storeData: response.data.data})
      this.setState({seller_id: response.data.data._id})
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  render(){
    return(
      <div>
      <header>
      <br/>
        <center><h1>Place An Order</h1></center>
      </header>
      <center><SearchExampleStandard/></center>
      <CheckOut seller_id={this.state.seller_id}/>
      <div>
      <FoodItemGrid sellerID={this.props.match.params.sellerID}/>
      </div>
      <StoreDescriptionCard name={this.state.storeData.name} />


      </div>
    )
  }
}
export default StorePage;
