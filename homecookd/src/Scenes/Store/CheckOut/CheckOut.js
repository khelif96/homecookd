import React, {Component}from 'react';
import { Button, Icon} from 'semantic-ui-react';
import CheckOutScreen from './CheckOutScreen';
import { connect } from 'react-redux'

const RightAlignPage = {

  width: 'auto',
  marginRight: 20,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  alignSelf: 'flex-end',
  flexDirection: 'column'
}

class CheckOut extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState({open: !this.state.open})
  }
  handleClose = () => {
    this.setState({open : false})
  }

  render(){
    return (
      <div style={RightAlignPage}>
      <CheckOutScreen seller_id={this.props.seller_id} open={this.state.open} handleClose={this.handleClose}/>
        <Button compact onClick={this.toggleModal} color='blue'>
          Check Out ({this.props.cart.cart.length})
          <Icon name='shopping cart'/>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return{
    cart: reduxState.cart
  }
}

export default connect(mapStateToProps)(CheckOut);
