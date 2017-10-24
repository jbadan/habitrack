import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';




class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div>
						<Signup lift={this.props.lift} />
						<Login lift={this.props.lift} user={this.props.user} />
				</div>
		)
	}
}

export default Main;
