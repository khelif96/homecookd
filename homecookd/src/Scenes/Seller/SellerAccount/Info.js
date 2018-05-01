import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const extra = (
  <a handleClick={()=>{this.AccordionExampleStandard()}}>
    <Icon name='circle' />
    Now Open
  </a>
)
const edit = (
  <a onClick={this.handleClose} href="/SellerProfileEdit">
  <Icon name ='edit' />
  Edit Profile
  </a>
)
const SellerInfoCard = () => (
  <Card
    image='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg'
    edit={edit}
    header='Restaurant Name'
    description='About the chef:'
    extra={extra}>
  </Card>


)

export default SellerInfoCard;
