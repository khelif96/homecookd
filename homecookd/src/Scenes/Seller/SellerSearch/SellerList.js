import React, { Component } from 'react';
import SearchBar from '../../SearchInput/SearchBar';
import { Card, Image,Button } from 'semantic-ui-react';
import {getSellers} from '../../../Utils/Sellers';

const containerStyle = {
  marginTop: '10px'
}

const imageStyle = {
  height: '90px',
  width: '160px'
}

const cardStyle = {
  width: '90%',
  margin: '5px auto',
  border: '1px solid rgba(70, 70, 70, 0.6)'
}

const deliveryFeeStyle = {
  float: 'right'
}

class SellerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: []
    }
  }


  componentDidMount() {
    getSellers()
    .then (response =>{
      this.setState({sellers: response.data.data.sellers})
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
      <center>
        <SearchBar />
        </center>
        <Card.Group style={containerStyle}>
          {
            this.state.sellers.map(seller =>
              <Card  style={cardStyle} >
                <Card.Content >
                  <Image style={imageStyle} size='small' floated='right' src={seller.picture}/>
                  <Card.Header>{seller.business_name}</Card.Header>
                  <Card.Description>{seller.description}</Card.Description>
                  <Card.Meta  style={deliveryFeeStyle}><a href={'/store/'+seller._id} ><Button color='green'>Visit</Button></a></Card.Meta>
                </Card.Content>
            </Card>
            )
          }
        </Card.Group>
      </div>
    )
  }
}

export default SellerList;
