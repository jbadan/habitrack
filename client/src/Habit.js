import React, { Component } from 'react';
import axios from 'axios';
import HabitList from './HabitList';

class Habit extends Component {
  constructor(props) {
    super(props)

    this.state = {
    	user: this.props.user,
    	habitArray: []
    }
  }

  componentDidMount(){
    axios.post('/habit/details', {
      user:this.state.user
    }).then(result => {
      let newArray = this.state.habitArray
      newArray.push(result.data)
      console.log(result.data)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      this.setState({
        habitArray: flattened
      })
    })
  }

  render() {
    return(
      <div>
      	<h1>My name is: {this.state.user.name}</h1>
      	{this.state.habitArray.map((habit, index) => {
          return(
          	<div>
            <h2>{habit.name}</h2>
            <p>{habit.difficulty}</p>
            <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Habit;
