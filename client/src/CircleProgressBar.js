import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

(function() {
   var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    Date.prototype.getDayName = function() {
      return days[ this.getDay() ];
    };
})();


class CircleProgressBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      weeklyGoal: this.props.weeklyGoal
    };
  }

  //get  total of previous days in month's completed items w/ difficulty + today's
  //change this to weekly goal and it gets waaaay easier
  componentDidMount = () => {
    var now = new Date();
    var day = now.getDayName();
    axios.post('/habit/progress', {
      user:this.props.user
    }).then(result => {

  })
}



  render() {
    return (
      <div>
        <p> Your weekly progress: </p>
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          size={80}
          thickness={5}
        />
      </div>
    );
  }
}

export default CircleProgressBar;
