import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLogged } from './actions/account-actions';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RoutePaths from './App/RoutePaths'
import LoggedInMenu from './Scenes/Home/LoggedInMenu';
import Drawer from 'material-ui/Drawer'
import './App.css';



class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <div>

        <FlatButton {...this.props} href="/auth/login" label="Login" />
        <FlatButton {...this.props} href="/auth/register" label="Register" />
      </div>

    );
  }
}

class App extends Component {

  logInUser(data) {
    this.props.logInUser(data);
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged : false
    }
    this.logInUser = this.logInUser.bind(this);

    this.logInUser(localStorage.getItem('api_token')!== null)
  }

  handleClick() {
  alert('onClick triggered on the title component');
}

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }
  handleToggle = () => this.setState({open: !this.state.open});

    render(){

    return (
      <MuiThemeProvider>

      <AppBar
        style={{backgroundColor:'#db2828'}}
        title="HomeCookd"
        iconElementRight={this.props.logged ? <LoggedInMenu /> : <Login />}
        onLeftIconButtonClick={this.handleToggle}
      />

      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
      >

        <MenuItem onClick={this.handleClose} href="/">Home</MenuItem>
        <MenuItem onClick={this.handleClose} href="/Sellers" >Order</MenuItem>
        <MenuItem onClick={this.handleClose} href="/Menu">Menu</MenuItem>
        <MenuItem onClick={this.handleClose}>Location</MenuItem>
        <MenuItem onClick={this.handleClose} href="/AboutUs">About Us</MenuItem>

        {!this.props.logged && <MenuItem  onClick={this.handleClose} href="/auth/loginSeller">Login As a Seller</MenuItem>}
        {!this.props.logged && <MenuItem onClick={this.handleClose} href="/auth/registerSeller">Register As a Seller</MenuItem>}


      </Drawer>
      <RoutePaths/>
      </MuiThemeProvider>

    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged,
    accountType: state.accountType
  };
};
const mapDispatchToProps = {
  logInUser: changeLogged
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
