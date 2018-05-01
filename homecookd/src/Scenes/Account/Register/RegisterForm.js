import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import './RegisterForm.css'
import {registerCustomer} from '../../../Utils/auth.js';
import { Message, Icon } from 'semantic-ui-react'

class RegisterForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        errorOccured: false,
        errorMessage: 'An Error Occured',
        loggingIn:false
      };
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.registerCustomer = registerCustomer.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
    }
    handleKeyChange(e){
      if(e.charCode === 13){
        this.handleFormSubmit(e);
      }
    }
    handleFormChange(e){
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value})
    }
    handleFormSubmit(e){
        // alert("TEST");
        this.setState({loggingIn:true,errorOccured:false});
        const email = this.state.email;
        const userName = this.state.userName;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const password = this.state.password;

        //call our axios promise, then retrieve the token from axios
      this.registerCustomer(email,userName,password,firstName,lastName)
          .then( response => {
            var api_token = response.data.api_token;
            if(api_token.length > 0) {
              localStorage.setItem('api_token',api_token);

              this.props.history.push('/')
            }
            else this.OpenPopUp();
          })
          .catch( error => {
            localStorage.removeItem('api_token');
            if(error.response === undefined){
              this.setState({loggingIn:false,errorOccured:true,errorMessage:'Couldnt Reach Server'});
            }else{
              this.setState({loggingIn:false,errorOccured:true,errorMessage:error.response.data.error});
            }
            // alert(error.response.data.error);
            // alert(error);
            // this.OpenPopUp();
          })
        e.preventDefault();
    }

    render(){
      const MessageBar = () => (
        <div>
        <Message error hidden={!this.state.errorOccured} icon>
        <Icon name='warning circle'/>
          {this.state.errorMessage}
        </Message>
        <Message hidden={!this.state.loggingIn} icon size='mini'>
          <Icon name='circle notched' loading />
          <Message.Header>
            Registering for an Account
          </Message.Header>
        </Message>
        </div>
      )
        const style = {
          height: {flex:1},
          width: {flex:2},
          margin: 20,
          padding: 40,
          textAlign: 'center',
          display: 'inline-block',
          // backgroundColor: 'grey'

        }
        return(
          <center>
          <br/>
          
          <Paper  style={style} onKeyPress={this.handleKeyChange} onSubmit={this.handleFormSubmit}>
            <h2 className="formTitle">Register</h2>
            <MessageBar/>
            <br/>
            <TextField autoFocus floatingLabelText="First Name" name="firstName" type="text" value={this.state.firstName} onChange={this.handleFormChange} />
            <br/>

            <TextField floatingLabelText="Last Name" name="lastName" type="text" value={this.state.lastName} onChange={this.handleFormChange} />
            <br/>

            <TextField floatingLabelText="Email" name="email" type="test" value={this.state.email} onChange={this.handleFormChange} />
            <br/>

            <TextField floatingLabelText="Username" name="userName" type="text" value={this.state.userName} onChange={this.handleFormChange} />
            <br/>

            <TextField floatingLabelText="Password" name="password" type="password" value={this.state.password} onChange={this.handleFormChange} />
            <br/>
            <br/>

            <RaisedButton type="submit" onClick={this.handleFormSubmit} label="Register" primary={true}  />
            <Link className="redirectLogin" to='/auth/Login'>Have an account? Log in</Link>
          </Paper>
          </center>
        )
    }
}

export default RegisterForm;
