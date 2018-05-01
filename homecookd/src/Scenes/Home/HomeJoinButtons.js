import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './HomeJoinButtons.css'

class HomeJoinButtons extends Component{
  render(){
    return(
      <div className="container">
        <RaisedButton className="button" href="/auth/Login" label="Login" primary={true}  />
        <RaisedButton className="button" href="/auth/Register" label="Get Started" primary={true}  />
        <RaisedButton className="button" href="/auth/RegisterSeller" label="Become a Seller" primary={true}  />
      </div>
    )
  }
}

export default HomeJoinButtons;
