import React, { Component } from 'react';
import { Segment, Menu } from 'semantic-ui-react';
import MenuItem from './MenuItem';
import NewMenuItemModal from './NewMenuItemModal';
import { getFoodItemsByAPItoken } from '../../../../Utils/storeData';

class MenuItemBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      foodItems : []
    };
  }
  componentDidMount(){
    getFoodItemsByAPItoken(localStorage.getItem('api_token'))
      .then(response => {
        const responseBody = response.data;
        console.log(JSON.stringify(responseBody.data));
        this.setState({foodItems: responseBody.data});
      })
      .catch(error => {
        alert(error);
      })
  }

  render(){
    return(
      <div style={{padding:50}}>
      <h1>Menu Items</h1>
      <Menu attached='top'>
      <NewMenuItemModal/>

      <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input className='prompt' type='text' placeholder='Search Menu Items...' />
            <i className='search link icon' />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu>
    </Menu>
      <Segment style={{overflow: 'auto', maxHeight: 200 }} attached='bottom'>
      {
              this.state.foodItems.map(function(foodItem) {
                  return <MenuItem foodItem={foodItem}/>
              })

        }

      </Segment>
      </div>
    )
  }
}
export default MenuItemBox;
