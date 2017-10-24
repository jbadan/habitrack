import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange= (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
      this.setState({
        redirect: true
      })
    })
  }

  render() {
    const{redirect} = this.state;
    if(redirect){
      return <Redirect to ='/display'/>
    }
    return (
      <div className="LoginBox">
        <form onSubmit={this.handleSubmit}>
          <TextField
               hintText="Email"
               floatingLabelText="Enter your email"
               value={this.state.email}
               onChange={this.handleEmailChange}
          /><br />
          <TextField
               hintText="Password"
               floatingLabelText="Enter your password"
               type="password"
               value={this.state.password}
               onChange={this.handlePasswordChange}
          /><br />
          <RaisedButton label="Log in" type='submit' />
        </form>
      </div>
    );
  }
}

export default Login;



// Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
//Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
