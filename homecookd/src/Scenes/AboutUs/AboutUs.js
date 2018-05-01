import React, { Component } from 'react';

const styles = {
  fontFamily: 'arial',
  fontSize: 20,
  padding: 20,
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
};
 const title = {
   fontFamily: 'arial',
   fontSize: 35,
   padding: 2,
   position: 'relative',
   top: '35%',
   left: '50%',
   transform: 'translate(-50%,-50%)'
 }
class AboutUs extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render(){
    return(
      <div style={styles}>
      <br/>

        <center><h2 style ={title}>About Us</h2></center>
          <p>
          Homecookd is an innovative way for you to have a fresh home cooked meal
          delivered to you by people just like yourself. Tired eating the same foods
          from your neighborhood? With Homecookd, you can order various types of authentic ethnic foods from
          people who know more about food than fast food restuarants do.
          </p>
      </div>
    )
  }
}
export default AboutUs
