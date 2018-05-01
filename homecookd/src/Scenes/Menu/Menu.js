import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1000,
    height: 450,
    overflowY: 'visible',
  },
};


const tilesData = [
  {
    img: 'http://www.ita-food.com/wp-content/uploads/2017/06/Chinese-Food.jpg',
    title: 'Chinese',
  },
  {
    img: 'http://convivionetwork.net/wp-content/uploads/2017/10/French-Cuisines-800x445.jpg',
    title: 'French',
  },
  {
    img: 'http://d2lkv2j4m042s95gkf28dijm.wpengine.netdna-cdn.com/wp-content/uploads/2015/05/greek-gyro-review-750x400.png',
    title: 'Greek',
  },
  {
    img: 'https://fthmb.tqn.com/Xa3lEBeDl4lvm_P04BJi-iNRQ2g=/960x0/filters:no_upscale()/309291-001-56a510423df78cf772862aea.jpg',
    title: 'Indian',
  },
  {
    img: 'http://www.kafepauza.mk/wp-content/uploads/2017/11/1-vreme-e-da-gi-isprobate-ova-se-najpopularnite-japonski-jadenja-www.kafepauza.mk_.jpg',
    title: 'Japanese',
  },
  {
    img: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/d05f9fcc7003488aa2840d15f4a7d470/BFV30005_SpicyKoreanPork-FB1080SQ_H264.jpg?output-format=webp&output-quality=60&resize=1000:*',
    title: 'Korean',
  },
  {
    img: 'http://s3.amazonaws.com/product-images.imshopping.com/nimblebuy/10-for-authentic-indian-greek-and-mediterranean-food-at-2-4890282-regular.jpg',
    title: 'Mediterranean',
  },
  {
    img: 'https://images3.persgroep.net/rcs/OrRHIMhVzMkoqBBpvPflPvKyjuE/diocontent/100666194/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9',
    title: 'Mexican',
  },
  {
    img: 'http://thewoksoflife.com/wp-content/uploads/2016/02/drunken-noodles-5.jpg',
    title: 'Thai',
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const Menu = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
      cols={3}
    >
      <Subheader><br />Pick a Category</Subheader><br/><br/><br/>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} alt={tile.title}/>
        </GridTile>
      ))}
    </GridList>
  </div>
);


export default Menu;
