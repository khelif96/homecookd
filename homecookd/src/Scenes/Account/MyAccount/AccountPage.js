import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Grid, Icon } from 'semantic-ui-react';
import Tabs from '../MyAccount/Tabs';
import Billing from '../MyAccount/BillingForm';

class AccountPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      loggingIn: false
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(e){
    const value = e.target.value;
    const name = e.target.nme;
    this.setState({[name]: value})
  }

  render(){
    const UserInfo = () => (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Icon name='user circle' size='massive'/>
            <br/>
            <TextField hintText="First name"  style={{fontSize:25, width:150}} underlineShow={false} />
            <TextField hintText="Last name"  style={{fontSize:25, width:100}} underlineShow={false} />
          </Grid.Column>
          <Grid.Column>
            <h1>Welcome</h1>

            <Divider />
            <TextField hintText="Email address"  underlineShow={false} />
            <Divider />
            <TextField hintText="Address"  underlineShow={false} />
            <Divider />
            <TextField hintText="Phone Number"  underlineShow={false} />
            <Divider />

          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
    const style = {
      flex: 1,
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
      // backgroundColor: 'grey'
    }
  return(
    <div>
      <Paper style={style}>
        <UserInfo/>
      </Paper>
      <Tabs />
      <Billing />
    </div>

    )
  }
}
export default AccountPage;
