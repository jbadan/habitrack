import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <div className="SignupBox">
        <form onSubmit={this.handleSubmit}>
          <TextField
               hintText="Name"
               floatingLabelText="What is your first name?"
               value={this.state.name}
               onChange={this.handleNameChange}
          /><br />
          <TextField
               hintText="Email"
               floatingLabelText="What is your email?"
               value={this.state.email}
               onChange={this.handleEmailChange}
          /><br />
          <TextField
               hintText="Password"
               floatingLabelText="Choose a password"
               type="password"
               value={this.state.password}
               onChange={this.handlePasswordChange}
          /><br />
          <RaisedButton label="Sign Up" type='submit' />
        </form>
      </div>
    );
  }
}

export default Signup;



//Name: <input type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
//Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
//Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
