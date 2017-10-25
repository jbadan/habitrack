import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import AppBar from 'material-ui/AppBar';




class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div>
					<AppBar
						title="HabiTracker"
						iconClassNameRight="muidocs-icon-navigation-expand-more"
					/>
					<div>
						<h3>Get Started with HabiTracker</h3>
					</div>
					<Signup lift={this.props.lift} />
					<Login lift={this.props.lift} user={this.props.user} />
				</div>
		)
	}
}

export default Main;
