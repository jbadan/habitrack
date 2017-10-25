import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false,
      open: false,
      loading: false,
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
    this.setState({loading: true});
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.lift(result.data)
      this.setState({
        redirect: true,
        open: false,
        loading: false,
      })
    })
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  render() {
    /**
    * Dialog with action buttons. The actions are passed in as an array of React objects,
    * in this example [FlatButtons](/#/components/flat-button).
    *
    * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
    */
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      >{this.state.loading ? <CircularProgress size={20} thickness={2} /> : ''}
      </FlatButton>,
      <FlatButton
        label="Login"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/display'/>
    };

    return (
      <div className="LoginBox">
        <RaisedButton label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Col sm={4}></Col>
          <Col sm={4}>
            <form onSubmit={this.handleSubmit}>
              <Row>
                  <TextField
                       hintText="Email"
                       floatingLabelText="Enter your email"
                       value={this.state.email}
                       onChange={this.handleEmailChange}
                  />
              </Row>
              <Row>
                  <TextField
                       hintText="Password"
                       floatingLabelText="Enter your password"
                       type="password"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                  />
              </Row>
            </form>
          </Col>
          <Col sm={4}></Col>
        </Dialog>
      </div>
    );
  }
}

export default Login;



// Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
//Password: <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
