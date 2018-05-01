import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
}

render(){
  const style = {
    height: {flex:1},
    width: {flex:2},
    margin: 20,
    padding: 40,
    textAlign: 'center',
    display: 'inline-block',

  }

  return(
    <center>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      <Paper style={style} zDepth={2} onKeyPress={this.handleKeyChange} onSubmit={this.handleFormSubmit}>
      <h2>Enter Your Email Address</h2>
      <TextField name="email" autoFocus
        floatingLabelText="Email Address"
      />

      <br />
      <br/>
      <RaisedButton href="/"label="Submit" type="submit" primary={true}/>

      </Paper>
    </center>
    );
  }
}

export default ForgotPassword;
