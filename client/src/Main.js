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
					<Signup lift={this.props.liftTokenToState} />
					<Login lift={this.props.liftTokenToState} />
			</div>
		)
	}
}

export default Main;
