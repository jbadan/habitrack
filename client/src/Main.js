import React, { Component } from 'react';
import HabitList from './HabitList';
import LineChart from './LineChart';
import RadarChart from './RadarChart';
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
