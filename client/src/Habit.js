import React, { Component } from 'react';
import axios from 'axios';
import HabitList from './HabitList';

class Habit extends Component {
  constructor(props) {
    super(props)

    this.state = {
    	user: this.props.user,
    	habit: this.props.habit
    }
  }

  render() {
    return(
      <div>
      	<h1>My name is: {this.state.user.name}</h1>
      	<h2>{this.props.habit.name}</h2>
      	<p>Difficulty: {this.props.habit.difficulty}</p>
      	<p>My goal is {this.props.habit.goal} days per week!</p>
      </div>
    )
  }
}

export default Habit;
