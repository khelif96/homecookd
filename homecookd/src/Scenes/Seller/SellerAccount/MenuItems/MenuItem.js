import React, { Component } from 'react';
import { Segment, Image} from 'semantic-ui-react';

import FavoriteStar from './FavoriteStar';
import MenuItemModal from './MenuItemModal';
class MenuItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      active : true,
      favorite: false
    };
    this.onFavorite = this.onFavorite.bind(this);
  }
  onFavorite(e){
    e.preventDefault();
    this.setState({favorite: !this.state.favorite});
  }
  render(){
    var color = 'red'
    if(this.state.active){
      color = 'green'
    }else{
      color = 'red'
    }
    return(

      <Segment color={color}>
      <FavoriteStar onClick={this.onFavorite} active={this.state.favorite}/>
      <Image avatar spaced='right'
      src={this.props.foodItem.image}/>
      {this.props.foodItem.name}
      <MenuItemModal food={this.props.foodItem}/>
      </Segment>
    )
  }
}
export default MenuItem;
