import React, { Component } from 'react';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import {cyanA400, grey900, grey400 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import {FlatButton } from 'material-ui';

const buttonStyle= {
  verticalAlign: 'middle'
}

const Logged = (props) => {
  let userName = props.user.name;
  let letter = userName.toUpperCase().charAt(0);
  const style = {margin: 5};
  return (
    <div style={{color: 'black'}}>

      <IconMenu
        {...props}
        iconButtonElement={
          <div>
            <IconButton>
              <Avatar
                color={grey900}
                backgroundColor={grey400}
                size={40}
                style={style}
              >
              {letter}
              </Avatar>
            </IconButton>
          </div>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign out" onClick={props.signOut}/>
      </IconMenu>
    </div>
  )
};

Logged.muiName = 'IconMenu';

/*
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      token: props.lift,
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({user: nextProps.user})
  }


  render() {
    return (
      <div>
        <AppBar
          title={<FlatButton
                containerElement={<Link to="/" />}
                label={"Habitrack"}
                labelStyle={{ fontSize: '1em'}}
                className={"logoStyle"}
                style={buttonStyle}
                hoverColor={cyanA400}
                />}
          //titleStyle={{textAlign: 'center'}}
          showMenuIconButton={false}
          iconElementRight={this.state.user.id ? <Logged user={this.state.user} signOut={this.props.signOut}/> : (
            <div className='nav-buttons'>
              <div className='nav-button'>
                <Signup lift={this.props.lift} handleRedirect={this.props.handleRedirect} primary={false}/>
              </div>
              <div className='nav-button'>
                <Login handleRedirect={this.props.handleRedirect} lift={this.props.lift}/>
              </div>
            </div>

          )}
        />
      </div>
    );
  }
}

export default Navbar;


// <span className="avatarName">{props.user.name}</span>
