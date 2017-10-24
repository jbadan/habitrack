import React, { Component } from 'react';
import HabitList from './HabitList';
import LineChart from './LineChart';
import RadarChart from './RadarChart';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<HabitList />
				<LineChart />
				<RadarChart />
			</div>
		)
	}
}

export default Main;
