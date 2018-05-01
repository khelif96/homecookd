import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { getFoodItemsBySellerID } from '../../../Utils/storeData.js';
import FoodItemCard from './FoodItemCard';
// import FoodGridMagnify from './FoodGridMagnify';

const FoodItemGridStyle = {
  width: '500px',
  marginLeft: 425,
  height: 0


}

class FoodItemGrid extends Component{
  constructor(props) {
    super(props);
    this.state = {
      foodItems : [],
      open: false,
      count : 0,
      FoodItemGrid: []
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState({open: !this.state.open})
  }
  handleClose = () => {
    this.setState({open : false})

  }

  componentDidMount(){
    getFoodItemsBySellerID(this.props.sellerID)
      .then(response => {
        const responseBody = response.data;
        this.setState({foodItems: responseBody.data});
        var FoodItemGrid = [];
        for(var i = 0; i<this.state.foodItems.length; i++){
          FoodItemGrid.push(<FoodItemCard onClick={this.toggleModal} id={this.state.foodItems[i]._id} foodItemName={this.state.foodItems[i].name}/>)
        }
        this.setState({FoodItemGrid: FoodItemGrid});


      })
      .catch(error => {

        console.log(error);
      })
  }



  render(){
    return(
      <div>

      {/* <FoodGridMagnify open={this.state.open} handleClose={this.handleClose}/> */}
        <Card.Group style={FoodItemGridStyle} itemsPerRow={3}>
          {
            this.state.FoodItemGrid
        }
        </Card.Group>
      </div>
    )
  }
}
export default FoodItemGrid;
