import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { MuiThemeProvider, AppBar, IconButton } from 'material-ui';


class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
					<AppBar
						title="HabiTracker"
					>
						<Signup lift={this.props.lift} />
						<Login lift={this.props.lift} user={this.props.user} />
					</AppBar>
				<div>
					<h3>Get Started with HabiTracker</h3>
				</div>
			</div>
		)
	}
}

export default Main;
