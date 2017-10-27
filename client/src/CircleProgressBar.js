import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import moment from 'moment';


import {grey400, grey500, darkBlack, lightBlack, pink} from 'material-ui/styles/colors';

(function() {
   var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    Date.prototype.getDayName = function() {
      return days[ this.getDay() ];
    };
})();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10) {dd = '0'+dd}
     if(mm<10) {mm = '0'+mm}
     today = mm + '/' + dd + '/' + yyyy;
     var currentWeekNumber = moment(today, "MMDDYYYY").isoWeek();

     function getSum(total, num) {
         return total + num;
     }

     const styles = {
       bg: {
         backgroundColor: "#616161",
         borderRadius:"100px",
         marginBottom: "20px"
       },
       minHeight: {
         minHeight: "500px",
         marginTop: "50px",
       },
       center:{
         textAlign: "center",
       },
       point:{
         position: "absolute",
         top: "30%",
         left: "44%"
       },
       parent:{
         position: "relative"
       }
     };

class CircleProgressBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      weeklyGoal: 0,
      points: 0
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.weeklyGoal > this.state.weeklyGoal || nextProps.pointControl > this.state.points){
    axios.post('habit/weeklyGoal', {
      user: this.props.user,
      weeklyGoalNew: this.props.weeklyGoal,
      weekNumber: currentWeekNumber
    }).then(result => {
        let score = 0;
        let scoreArr = []
        let newTotal = 0
        for(let i=0; i< result.data.length; i++){
          if(result.data[i].difficulty === 'easy'){
            score =  10;
            scoreArr.push(score)
          }else if(result.data[i].difficulty === 'medium'){
            score =  20;
            scoreArr.push(score)
          }else if(result.data[i].difficulty === 'hard'){
            score =  30;
            scoreArr.push(score)
        }
        newTotal = scoreArr.reduce(getSum);
        //math to convert total to #/100

    }
    let circleInfo = ((newTotal/2)*100)/(this.props.weeklyGoal)
    this.setState({
      completed: circleInfo,
      weeklyGoal: this.props.weeklyGoal,
      points: newTotal
    })

  })
  }
}

  render() {

    return (
      <div style={styles.parent}>
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          size={200}
          thickness={30}
          innerStyle = {styles.bg}
        />
        <h1 style={styles.point}> {this.state.points} </h1>
      </div>
    );
  }
}

export default CircleProgressBar;
