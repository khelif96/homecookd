import React from 'react'
import { Button } from 'semantic-ui-react'


const textColor = {
  color: 'white'
}

const GetStarted = () => (
  <div style={textColor}>

    <Button href="/auth/register" color='red' content='Get Started' />
  </div>
)

export default GetStarted;
