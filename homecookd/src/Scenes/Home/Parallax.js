import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react'
import { Parallax } from 'react-parallax';
import GetStarted from './ParallaxButton';
import Steps from './StepByStep'


const styles = {
  fontFamily: 'arial',
  backgroundColor: 'black'
};
const insideStyles = {fontSize: 70, fontWeight: 'bold', color:'ivory', padding: 20, position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)'};
const captionStyles = {fontSize: 30, color:'ivory',  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'};
const buttonStyles = {fontSize: 30, color:'white',  position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%,-50%)'};
const secondPicDescriptionStyles = {fontSize: 70, color:'ivory', position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%,-50%)'};
const secondCaptionStyles = {fontSize: 24, color:'ivory', padding: 20, position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)'};
const stepsStyles = {fontSize: 30, color:'ivory',  position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%,-50%)'};
const faceBookLogoStyles = {position: 'absolute', top: '45%', left: '35%'}
const instgramLogoStyles = {position: 'absolute', top: '45%', left: '45%'}
const twitterLogoStyles = {position: 'absolute', top: '45%', left: '55%'}
const image1 = "https://cf.ua/m/blog/43b1da4a0a2302806bcc9702d1551645/images/gallery-1447358888-clx110114clkt-59a6da0936811.jpg";
const image2 = "http://www.zastavki.com/pictures/originals/2015/Food___Bread_rolls_croissants_Christmas_apple_pie_105881_.jpg";
const image3 = "https://i0.wp.com/blog.hellofresh.com/wp-content/uploads/2017/02/veggies-winter-food-gradient-table-banner-red.jpg?ssl=1";

class HomeBg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
  <div style={styles}>
    <Parallax bgImage={image1}
      strength={300}>
      <div style={{height: 500}}>
        <div style={insideStyles}>HomeCookd</div>
        <div style={captionStyles}>Because Home is where the heart is.</div>
      </div>
      <div style={buttonStyles}>
      <GetStarted />
      </div>
    </Parallax>
    <Parallax bgImage={image3} blur={{min: -1,max:3}} >
      <div style={{height: 500}}>
      <div style={secondPicDescriptionStyles}>How It Works</div>
      <div style={secondCaptionStyles}>
      HomeCookd provide users the opportunity to showcase{"\n"} their culinary talent whether
      you are an expert chef or a{"\n"} stay-at-home-mom. On the flipside, as a customer you{"\n"} will enjoy
     meals made by people who know what{"\n"} authentic means.
      </div>

        <div></div>

      </div>
      <div style={stepsStyles}>
      <Steps/>
      </div>
    </Parallax>
    <Parallax bgImage={image2} strength={-100}>
      <div style={{height: 500}}>
        <div style={insideStyles}>Follow Us On</div>
      </div>
      <div style={faceBookLogoStyles}>
      <Icon name="facebook square" size="massive"/>
       </div>
      <div style={instgramLogoStyles}>
      <Icon name="instagram" size="massive"/>
      </div>
      <div style={twitterLogoStyles}>
      <Icon name="twitter square" size="massive"/>
      </div>
    </Parallax>

      </div>


    );
  }
}
export default HomeBg;
