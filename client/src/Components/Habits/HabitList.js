import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ResponsiveLineChart from '../DataVis/ResponsiveLineChart';
import RadarChart from '../DataVis/RadarChart';
import NotEnoughData from '../Other/NotEnoughData';
import CircleProgressBar from '../DataVis/CircleProgressBar';
import AddNewHabit from './HabitListComponents/AddNewHabit';
import HabitDrawer from './HabitListComponents/HabitDrawer';
import {BrowserRouter as Router,Redirect} from 'react-router-dom';
import Navbar from '../Main/Navigation/Navbar';
import '../../Styles/habitList.css';
//material-ui
import {RaisedButton, List, ListItem, Subheader, Divider, Checkbox, Card, Paper} from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';


//date prototype functions to get date for welcome message
(function() {
   var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    Date.prototype.getMonthName = function() {
      return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
      return days[ this.getDay() ];
    };
})();


class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      user: this.props.user,
      redirect: false,
      selectedItem: true,
      //controls drawer of all habits
      open2: false,
      //this is for the line graph
      dateAndCount: [],
      points: 0,
      weeklyGoal: 0,
      weeklyPoints: 0,
      //handles disabling checkboxes for daily tasks
      completeArrayDaily: []
    }
  }

  componentDidMount(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10) {dd = '0'+dd}
     if(mm<10) {mm = '0'+mm}
     today = mm + '/' + dd + '/' + yyyy;
    axios.post('/habit', {
      user:this.state.user,
      date: today
    }).then(result => {
      let newweeklyGoal = result.data.weeklyGoal
      let newCompleteArray = [];
      var now = new Date();
      var day = now.getDayName();
      for(let j=0; j<result.data.habits.length; j++){
          //controlling for weekend activities
        if((day === 'Saturday' || day === 'Sunday') && (result.data.habits[j].goal === 7 || result.data.habits[j].goal === 2)){
            newCompleteArray.push(result.data.habits[j].completed)
        }else if((result.data.habits[j].goal === 7 || result.data.habits[j].goal === 5) && (day === "Monday" || day === "Tuesday"|| day === "Wednesday"|| day === "Thursday"|| day === "Friday")){
            newCompleteArray.push(result.data.habits[j].completed)
          }
      }

      //fetches all habits from user
      let newArray = this.state.habitArray
      newArray.push(result.data.habits)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      //fetches all dates and total times users completed a habit
      let dateAndCountNew = result.data.total
      dateAndCountNew.forEach(d => {
        d.date = Date.parse(d.date);
        d.count = +d.count;
    })
    this.setState({
      habitArray: flattened,
      dateAndCount: dateAndCountNew,
      weeklyGoal: newweeklyGoal,
      completeArrayDaily: newCompleteArray,
      points: result.data.points
    })
  })
  }

 liftAfterAdd = (result, updates) => {
   this.setState({
     habitArray: result.updates,
     weeklyGoal: result.result.weeklyGoal,
     open2: true,
     completeArrayDaily: result.result.habitCompletedArray
   })
 }

 liftDrawer = () => {
   this.setState({
     redirect: true
   })
 }
 liftHabitArray = (result) => {
   this.setState({
     habitArray: result.data.habits
   })
 }
   //adds today's date and points to database
   handleDate = (e) => {
     e.preventDefault()
     let habitName = e.target.getAttribute('value');
     //get today's date
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
      if(dd<10) {dd = '0'+dd}
      if(mm<10) {mm = '0'+mm}
      today = mm + '/' + dd + '/' + yyyy;
      var weekNumber = moment(today, "MMDDYYYY").isoWeek();
     axios.post('/habit/date', {
       user: this.props.user,
       date: today,
       name: habitName,
       week: weekNumber
     }).then(result => {
       let newPointTotal = result.data.points
       let count = result.data.total
       count.forEach(d => {
         d.date = Date.parse(d.date);
         d.count = +d.count;
     })
       let habitCompleteArray = result.data.habitCompletedArray
       this.setState({
          dateAndCount: count,
          points: newPointTotal,
          completeArrayDaily: habitCompleteArray
       })
     })
   }

  handleDrawerToggle = () => this.setState({open2: !this.state.open2});

  render() {
    //control for line chart/radar data
      let data = this.state.dateAndCount
      let lineChart = ''
      let renderRadar = ''
      let text = ''
      if(data.length === 0){
        lineChart = <NotEnoughData />
        renderRadar = <NotEnoughData />
        text = <NotEnoughData />
      }else{
        lineChart = <ResponsiveLineChart data={data} />
        renderRadar =   <Card className="minHeight"><RadarChart datesArr={data} /></Card>
        text = <Paper zDepth={3} className="paper">
          <h4 className="paddingTextTop">What am I looking at?</h4>
          <p className="paddingText">This line graph is your total habit overview. The horizontal axis shows a linear progression by date and the vertical axis displays the number of habits you marked as complete that day. </p>
          <p className="paddingText">The radar graph gives you the same information organized by day of the week. This makes it easier to see your trends by specific weekdays or just the weekend. </p>
        </Paper>
      }
    //redirecting to more detail page after click
      const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/habit'/>
      }

      //getting today's date for welcome header(Wednesday, October 27, 2017 format)
      let todayDate = new Date();
      let dd = todayDate.getDate();
      let yyyy = todayDate.getFullYear();
       if(dd<10) {dd = '0'+dd}
      var now = new Date();
      var day = now.getDayName();
      var month = now.getMonthName();

      //today's to do List population logic
      let todayArr = []
        for(let i = 0; i < this.state.habitArray.length; i++){
          if(this.state.habitArray[i].goal === 7 || (this.state.habitArray[i].goal === 5 && (day === "Monday" || day === "Tuesday"|| day === "Wednesday"|| day === "Thursday"|| day === "Friday"))){
          todayArr.push(this.state.habitArray[i])
          }else if(this.state.habitArray[i].goal === 7 || (this.state.habitArray[i].goal === 2 && (day === "Saturday" || day === "Sunday"))){
            todayArr.push(this.state.habitArray[i])
          }
        }

    return(
      <div className="styles-bg">
        <Navbar user={this.props.user} lift={this.props.lift} signOut={this.props.signOut} />
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={1} />
              <Col xs={9}>
                <h1 className="header"> Hello, {this.state.user.name}! </h1>
                <h6 className="subHeader">Today is {day}, {month} {dd}, {yyyy} </h6>
              </Col>
              <Col xs={1}>
                <AddNewHabit weeklyGoal={this.state.weeklyGoal} user={this.props.user} habitArray={this.state.habitArray} liftAfterAdd={this.liftAfterAdd}/>
              </Col>
              <Col xs={1}/>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={1} />
              <Col xs={10} sm={6}>
              <Paper className="minHeight" zDepth={3}>
              <Row start="xs">
                <Col xs={6}>
                  <RaisedButton
                        label="See all habits"
                        onClick={this.handleDrawerToggle}
                      />
                </Col>
              </Row>
              <Row>
                <Col xs={2}/>
                <Col xs={8}>
                  <List>
                    <Subheader className="subHeader">Today{`'`}s Habits</Subheader>
                  {todayArr.map((habit, index) => {
                    return(
                      <Row>
                        <Col xs={12}>
                          <ListItem
                            key={index}
                            leftCheckbox={<Checkbox onClick={(e) => this.handleDate(e)}
                                                    disabled={this.state.completeArrayDaily[index]}
                                                    value={habit.name}
                                                    checked={this.state.completeArrayDaily[index]}
                                                    />}
                            primaryText={habit.name}
                          />
                        </Col>
                      </Row>
                    )
                  })}
                  </List>
                </Col>
                <Col xs={2}/>
              </Row>
              </Paper>
              </Col>

              <Col xs={12} sm={4}>
                <Paper className="style1" zDepth={4}>
                  <Row center="xs">
                    <Col xs={12}>
                      <h2>Total Points </h2>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={12}>
                      <h3>{this.state.points}</h3>
                      <Divider />
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={12}>
                      <h2>Weekly Goal </h2>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={12}>
                      <h3>{this.state.weeklyGoal}</h3>
                      <Divider />
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={12}>
                      <h2>Weekly Progress </h2>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col xs={12}>
                      <CircleProgressBar user={this.props.user} weeklyGoal={this.state.weeklyGoal} points={this.state.weeklyPoints} pointControl={this.state.points} />
                    </Col>
                  </Row>
                </Paper>
              </Col>
              <Col xs={1} />
            </Row>
          </Col>
        </Row>
        <Row className="moveDown"></Row>
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Card>
              {lineChart}
            </Card>
          </Col>
          <Col xs={1}/>
        </Row>
        <Row className="moveDown"></Row>
      <Row middle="xs" center="xs">
            <Col xs={2} />
            <Col xs={12} sm={6}>
                {renderRadar}
            </Col>
          <Col xs={12} sm={2}>
                {text}
          </Col>
            <Col xs={2} />
        </Row>
          <HabitDrawer user={this.props.user} habitArray={this.state.habitArray} liftHabit={this.props.liftHabit} liftDrawer={this.liftDrawer} liftHabitArray={this.liftHabitArray} open={this.state.open2} closeDrawer={this.handleDrawerToggle}/>

      </div>
    )
  }
}

export default HabitList;
