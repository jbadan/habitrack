import React, { Component } from 'react';
import { AppBar, Drawer, IconMenu, MenuItem, RaisedButton, IconButton, Toggle } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Signup from './Signup';
import Login from './Login';
import { grey900, grey800, grey400 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';


const Logged = (props) => {
  let userName = props.user.name;
  let letter = userName.toUpperCase().charAt(0);
  const style = {margin: 5};
  return (
    <div style={{color: 'black'}}>
      <Avatar
        color={grey900}
        backgroundColor={grey400}
        size={40}
        style={style}
      >
      {letter}
      </Avatar>
      {props.user.name}
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    </div>
  )
};

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      drawerOpen: false,
      menuOpen: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({user: nextProps.user})
  }

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

  handleMenuToggle = () => this.setState({menuOpen: !this.state.menuOpen});

  render() {

    console.log(this.state.user.name);

    return (
      <div>
        <AppBar
          title="HabiTracker"
          //titleStyle={{textAlign: 'center'}}
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          iconElementRight={this.state.user.id ? <Logged user={this.state.user}/> : (
            <div className='nav-buttons'>
              <div className='nav-button'>
                <Signup lift={this.props.lift}/>
              </div>
              <div className='nav-button'>
                <Login lift={this.props.lift}/>
              </div>
            </div>

          )}
        />
        <Drawer open={this.state.drawerOpen}>
            <IconButton><NavigationClose onClick={this.handleDrawerToggle}/></IconButton>
            <MenuItem>Login</MenuItem>
            <MenuItem>Signup</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
