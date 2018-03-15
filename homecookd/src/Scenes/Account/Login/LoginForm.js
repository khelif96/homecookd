import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLogged } from '../../../actions/account-actions';
import { updateUser } from '../../../actions/user-actions';

import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Message, Icon} from 'semantic-ui-react';

import {loginCustomer} from '../../../Utils/auth.js';

class LoginForm extends Component{


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorOccured: false,
      errorMessage: 'An Error Occured',
      loggingIn: false
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loginCustomer = loginCustomer.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
  }

  logInUser(data){
    this.props.logInUser(data);
  }

  updateUser(type) {
    this.props.updateUser(type);
  }

  handleKeyChange(event){
    if(event.charCode === 13){
      this.handleFormSubmit(event);
    }
  }

  handleFormChange(e){
      const value = e.target.value;
      const name = e.target.name;
      this.setState({[name]: value})
  }

  handleFormSubmit(e){
      // alert("Logging in ");
      this.setState({loggingIn:true,errorOccured:false})
      const email = this.state.email;

      const password = this.state.password;

      //call our axios promise, then retrieve the token from axios
    this.loginCustomer(email,password)
        .then( response => {
          var api_token = response.data.api_token;
          if(api_token.length > 0) {
            localStorage.setItem('api_token',api_token);

            this.props.history.push('/')
            this.logInUser(true);
            this.updateUser("customer");
          }
          else this.OpenPopUp();
        })
        .catch( error => {
          localStorage.removeItem('api_token');
          // alert(error.response.data.error);
          if(error.response == undefined){
            this.setState({loggingIn:false,errorOccured:true,errorMessage:'Couldnt Reach Server'});
          }else{
            this.setState({loggingIn:false,errorOccured:true,errorMessage:error.response.data.error});
          }

          // alert(error);
          // this.OpenPopUp();
        })
      e.preventDefault();
  }

  render(){
    const style = {
      height: {flex:1},
      width: {flex:2},
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
      // backgroundColor: 'grey'

    }
    const MessageBar = () => (
      <div>
      <Message error hidden={!this.state.errorOccured} icon>
      <Icon name='warning circle'/>
        {this.state.errorMessage}
      </Message>
      <Message hidden={!this.state.loggingIn} icon size='mini'>
        <Icon name='circle notched' loading />
        <Message.Content>
          Logging In
        </Message.Content>
      </Message>
      </div>
    )


    return(
      <center>
        <Paper style={style} zDepth={2} onKeyPress={this.handleKeyChange} onSubmit={this.handleFormSubmit}>
        <h2>LOGIN</h2>
        <MessageBar/>
        <TextField name="email" autoFocus
          floatingLabelText="Email"
          onChange={this.handleFormChange}
        />
        <br/>
        <TextField
          name="password"
          floatingLabelText="Password"
          onChange={this.handleFormChange}
          type="password"
        />
        <br />
        <RaisedButton onClick={this.handleFormSubmit} href="/"label="Login" type="submit" primary={true}  />
        <br/>

        <Link to="/register">Make an Account</Link>
        </Paper>
      </center>

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
  logInUser: changeLogged,
  changeAccountType: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
