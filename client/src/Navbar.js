import React, { Component } from 'react';
import { AppBar, Drawer, IconMenu, MenuItem, RaisedButton, IconButton, Toggle } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Signup from './Signup';
import Login from './Login';

const Logged = (props) => (
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
);

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
    return (
      <div>
        <AppBar
          title="Title"
          title="HabiTracker"
          titleStyle={{textAlign: 'center'}}
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          iconElementRight={this.state.user.id ? <Logged /> : (
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
