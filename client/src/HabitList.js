import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import ResponsiveLineChart from './ResponsiveLineChart';
import RadarChart from './RadarChart';
import NotEnoughData from './NotEnoughData';
import CircleProgressBar from './CircleProgressBar';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

//material-ui
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';

const styles = {
  bg: {
    backgroundColor: "lightBlack",
  },
  minHeight: {
    minHeight: "500px",
    marginTop: "50px",
  },
  center:{
    textAlign: "center",
  }
};
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

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
      newItem: '',
      user: this.props.user,
      redirect: false,
      difficulty: 'easy',
      //frequency value
      value: 0,
      selectedItem: true,
      //open controls dialog box for adding new habit
      open: false,
      //dates added is array of objects- new dates added after task completion
      datesAdded: [],
      //this is for the line graph
      dateAndCount: [],
      points: 0,
      weeklyGoal: ''
    }
  }
  //populates habitArray, datesAdded, dateAndCount from database on load
  componentDidMount(){
    axios.post('/habit', {
      user:this.state.user
    }).then(result => {
      let newweeklyGoal = result.data.weeklyGoal
      //fetches all habits from user
      let newArray = this.state.habitArray
      newArray.push(result.data.habits)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      //fetches all dates and total times users completed a habit
      let dateAndCountNew = this.state.dateAndCount
      //this is controlling for empty data so we don't end up with a null object pushed to array
      if(result.data.total.length === 0){
        //do nothing
      }else{
        dateAndCountNew.push(result.data.total)
      }
      //removing counts from data for use in radar chart
      let dateOnly = []
      if(dateAndCountNew.length === 0){
        //do nothing
      }else{
        for(let i=0; i<dateAndCountNew.length; i++){
          dateOnly.push({"date": dateAndCountNew[i].date})
        }
        if(dateOnly.length === 0){
          this.setState({
            habitArray: flattened,
            weeklyGoal: newweeklyGoal
          })
        }else{
          this.setState({
            habitArray: flattened,
            datesAdded: dateOnly,
            dateAndCount: dateAndCountNew,
            weeklyGoal: newweeklyGoal
          })
        }
      }
  })
  }

  //change handler for new habit name
  newItemChange = (e) => {
    this.setState({
      newItem: e.target.value
    })
  }

  //change handler for radio buttons (difficulty)
  handleOptionChange = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //handlers for opening/closing add more dialog button
   handleOpen = () => {
      this.setState({open: true});
   };
   handleClose = () => {
     this.setState({open: false});
   };

//add new habit to database and list
  addItem = (e) => {
    e.preventDefault()
    var updates = this.state.habitArray;
    updates.push({name: this.state.newItem, difficulty: this.state.difficulty, goal: this.state.value});
    //post new item to database
    axios.post('/habit/new',{
      user: this.props.user,
      name: this.state.newItem,
      difficulty: this.state.difficulty,
      goal: this.state.value
    }).then(result => {
      this.setState({
        habitArray: updates,
        open: false,
        weeklyGoal: result.data.weeklyGoal
      })
    })
  }

//sub menu with more and delete
  menuClicked = (event, value) => {
    this.setState({
       selectedItem: value
   }, () => {
     //if selectedItem is number(ie index then delete has been selected)
     if(Number.isInteger(this.state.selectedItem)){
       let updates = this.state.habitArray;
       let index = this.state.selectedItem;
       updates.splice(index, 1);
       this.setState({
         habitArray:  updates
       })
       axios.post('/habit/delete', {
         user: this.props.user,
         indexNumber: index
       }).then(result => {
         //nothing yet
       })
       //this means more info has been selected - redirect to habit info page
     }else if(typeof this.state.selectedItem === "string"){
       let habitName = this.state.selectedItem;
       axios.post('/habit/details', {
        user: this.props.user,
        name: habitName
       }).then(result => {
         this.props.liftHabit(result.data);
       })
       this.setState({
         redirect: true
       })
     }
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
      //making array of objects for radar chart weekday data
        let newDateForArray = {
          date: today
        }
        let dateArray = this.state.datesAdded
        dateArray.push(newDateForArray)
     axios.post('/habit/date', {
       user: this.props.user,
       date: today,
       name: habitName
     }).then(result => {
       console.log(result.data)
       let newPointTotal = result.data.points
       let count = result.data.total
       let newWeekGoal = result.data.weeklyGoal
       this.setState({
         datesAdded: dateArray,
          dateAndCount: count,
          points: newPointTotal,
          weeklyGoal: newWeekGoal
       })
     })
   }
   //change handler for goal setting
   handleChange = (event, index, value) => this.setState({value});

  render() {
    //control for line chart data
      let theData = this.state.dateAndCount
      let lineChart = ''
      if(theData.length === 0){
        lineChart = <NotEnoughData />
      }else{
        lineChart =
            <Row>
              <Col xs={1} />
              <Col xs={10} >
                <Card>
                  <ResponsiveLineChart data={theData} />
                </Card>
              </Col>
              <Col xs={1}/>
            </Row>

      }
    //redirecting to more detail page after click
      const{redirect} = this.state;
      if(redirect){
        return <Redirect to ='/habit'/>
      }
    //add new item modal button controls
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={(e) => this.addItem(e)}
        />,
      ];
    //if statement to control if there is enough data to render a radar chart
      let renderRadar = ''
      if(this.state.datesAdded.length === 0){
        renderRadar = <NotEnoughData />
      }else{
        renderRadar = <RadarChart datesArr={this.state.datesAdded} />
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
      let weeklyArr = []
      let everydayArr = []
      let weekdayArr = []
      let weekendArr = []
        for(let i = 0; i < this.state.habitArray.length; i++){
          if(this.state.habitArray[i].goal === 1){
            weeklyArr.push(this.state.habitArray[i])
          }else if(this.state.habitArray[i].goal === 7){
            everydayArr.push(this.state.habitArray[i])
          }else if(this.state.habitArray[i].goal === 5){
            weekdayArr.push(this.state.habitArray[i])
          }else if(this.state.habitArray[i].goal === 2){
            weekendArr.push(this.state.habitArray[i])
          }
        }
        //TODO: need to handle weekly todos
      if(day === "Saturday" || day === "Sunday"){
        let newArr = weekendArr.concat(everydayArr)
        todayArr = newArr
      }else{
        let newArr = weekdayArr.concat(everydayArr)
        todayArr = newArr
      }


    return(
      <div style={styles.bg}>
        <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={12}>
              <h1> Hello, {this.state.user.name}! </h1>
              <h6>Today is {day}, {month} {dd}, {yyyy} </h6>
            </Col>
          </Row>
        </Col>
        </Row>

        {lineChart}

        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
              <Card style={styles.minHeight}>
                <Subheader style={styles.center}>Todays to do list</Subheader>
              <List>
              {todayArr.map((habit, index) => {
                return(
                  <Row>
                    <Col xs={10}>
                      <ListItem
                        leftCheckbox={<Checkbox onClick={(e) => this.handleDate(e)} value={habit.name}/>}
                        primaryText={habit.name}
                      />
                    </Col>
                  </Row>
                )
              })}
              </List>
              </Card>
              </Col>
              <Col xs={3}>
                <Card style={styles.minHeight}>
                  <h3>You have {this.state.points} points </h3>
                  <h3> Your weekly goal is {this.state.weeklyGoal} points </h3>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
        <Col xs={12}>
          <Row>
            <Col xs={1} />
            <Col xs={5}>
              <Card style={styles.minHeight}>
                <Subheader style={styles.center}>My Habits</Subheader>
              <List>
              {this.state.habitArray.map((habit, index) => {
                return(
                  <Row>
                    <Col xs={10}>
                      <ListItem
                        primaryText={habit.name}
                        rightIconButton={
                            <IconMenu iconButtonElement={iconButtonElement} value= { this.state.selectedItem } onChange={ this.menuClicked }>
                              <MenuItem value={habit.name}>More Information</MenuItem>
                              <MenuItem value={index}>Delete</MenuItem>
                            </IconMenu>
                        }
                      />
                    </Col>
                  </Row>
                )
              })}
              </List>
              <RaisedButton style={styles.center} label="Add new habit" onClick={this.handleOpen} />
              <Dialog
                open={this.state.open}
                onRequestClose = {this.handleClose}
                actions={actions}
                >
                    <form>
                        <TextField name="habit" onChange={(e) => this.newItemChange(e)} value={this.state.newItem} hintText="Type new habit here"/> <br/>

                       <RadioButtonGroup onChange={this.handleOptionChange} name="difficulty" defaultSelected="Easy">
                            <RadioButton
                                  value="easy"
                                  label="Easy"
                                />
                                <RadioButton
                                  value="medium"
                                  label="Medium"
                                />
                                <RadioButton
                                  value="hard"
                                  label="Hard"
                                />
                      </RadioButtonGroup>

                     <SelectField
                         floatingLabelText="Frequency"
                         name="goal"
                         default="Everyday"
                         value={this.state.value}
                         onChange={this.handleChange}
                      >
                         <MenuItem value={7} primaryText="Everyday" />
                         <MenuItem value={5} primaryText="Weekdays" />
                         <MenuItem value={2} primaryText="Weekends" />
                         <MenuItem value={1} primaryText="weekly" />
                    </SelectField> <br/>
                    </form>
                </Dialog>
              </Card>
            </Col>


            <Col xs={5}>
              <Card style={styles.minHeight}>
                {renderRadar}
              </Card>
            </Col>
            </Row>
          </Col>
          <Col xs={1}/>
        </Row>


      </div>
    )
  }
}

export default HabitList;
