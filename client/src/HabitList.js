import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import moment from 'moment';
import ResponsiveLineChart from './ResponsiveLineChart';
import RadarChart from './RadarChart';
import NotEnoughData from './NotEnoughData';
import CircleProgressBar from './CircleProgressBar';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

//material-ui
import {RaisedButton, SelectField, RadioButton, RadioButtonGroup,
  TextField, FlatButton, List, ListItem, Subheader, Divider, Checkbox, IconMenu,
  IconButton, Dialog, Drawer, Card, CardTitle, MenuItem, Paper, FloatingActionButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  bg: {
    backgroundColor: "lightBlack",
  },
  minHeight: {
    height: 570,
  },
  center:{
    textAlign: "center",
    color: "#00ACC1",
    fontSize: "1.2em"
  },
  header:{
    color: "#D81B60",
    fontSize: "2em"
  },
  subHeader:{
    color: "#FAFAFA",
    fontSize: "1.2em"

  },
  style1:{
    height: 570,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  minRow:{
    height: 400
  },
  moveDown:{
    height: 30
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
    axios.post('/habit', {
      user:this.state.user
    }).then(result => {
      let newweeklyGoal = result.data.weeklyGoal
      let newCompleteArray = []
      for(let j=0; j<result.data.habits; j++){
        if(result.data.habits.goal != 2){
          newCompleteArray.push(result.data.habits[j].completed)
        }
      }
      //fetches all habits from user
      let newArray = this.state.habitArray
      newArray.push(result.data.habits)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      //fetches all dates and total times users completed a habit
      let dateAndCountNew = result.data.total
      //this is controlling for empty data so we don't end up with a null object pushed to array
      if(result.data.total.length === 0){
        //do nothing
      }else{
        dateAndCountNew.push(result.data.total)
      }
    this.setState({
      habitArray: flattened,
      dateAndCount: dateAndCountNew,
      weeklyGoal: newweeklyGoal,
      completeArrayDaily: newCompleteArray
    })
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
     this.setState({
       open: false,
       newItem: '',
       difficulty: 'easy',
     });
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
      goal: this.state.value,
      weeklyGoal: this.state.weeklyGoal
    }).then(result => {
      let newCompleteArray = result.data.habitCompletedArray
      this.setState({
        habitArray: updates,
        open: false,
        weeklyGoal: result.data.weeklyGoal,
        open2: true,
        completeArrayDaily: newCompleteArray
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
      var weekNumber = moment(today, "MMDDYYYY").isoWeek();
      //making array of objects for radar chart weekday data
        let newDateForArray = {
          date: today,
          week: weekNumber
        }
    console.log("this is today's date")
    console.log(today)
     axios.post('/habit/date', {
       user: this.props.user,
       date: today,
       name: habitName,
       week: weekNumber
     }).then(result => {
       console.log("this is the result")
       console.log(result.data)
       let newPointTotal = result.data.points
       let count = result.data.total
       let habitCompleteArray = result.data.habitCompletedArray
       this.setState({
          dateAndCount: count,
          points: newPointTotal,
          completeArrayDaily: habitCompleteArray
       })
     })
   }
   //change handler for goal setting
   handleChange = (event, index, value) => this.setState({value});

  handleDrawerToggle = () => this.setState({open2: !this.state.open2});

  handleDrawerClose = () => this.setState({open2: false});

  render() {

    //control for line chart/radar data
      let data = this.state.dateAndCount
      console.log(data);
      let lineChart = ''
      let renderRadar = ''
      if(data.length === 0){
        lineChart = <NotEnoughData />
        renderRadar = <NotEnoughData />
      }else{
        lineChart =<ResponsiveLineChart data={data} />
        renderRadar = <RadarChart datesArr={data} />


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
      let everydayArr = []
      let weekdayArr = []
      let weekendArr = []
        for(let i = 0; i < this.state.habitArray.length; i++){
          if(this.state.habitArray[i].goal === 7){
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
          <Row>
            <Col xs={1} />
            <Col xs={9}>
              <h1 style={styles.header}> Hello, {this.state.user.name}! </h1>
              <h6 style={styles.subHeader}>Today is {day}, {month} {dd}, {yyyy} </h6>
            </Col>
            <Col xs={1}>
              <FloatingActionButton
                secondary={true}
                onClick={this.handleOpen}
                style={{marginTop: '50px'}}
              >
                  <ContentAdd />
              </FloatingActionButton>
            </Col>
            <Col xs={1}/>
          </Row>
        </Col>
        </Row>


        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={1} />
              <Col xs={6}>
              <Paper style={styles.minHeight} zDepth={3}>
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
                    <Subheader style={styles.subHeader}>Today{`'`}s Habits</Subheader>
                  {todayArr.map((habit, index) => {
                    return(
                      <Row>
                        <Col xs={12}>
                          <ListItem
                            leftCheckbox={<Checkbox onClick={(e) => this.handleDate(e)}
                                                    disabled={this.state.completeArrayDaily[index]}
                                                    value={habit.name}
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

              <Col xs={4}>
                <Paper style={styles.style1} zDepth={4}>
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

        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Card>
              {lineChart}
            </Card>
          </Col>
          <Col xs={1}/>
        </Row>
        <Row style={styles.moveDown}>
        </Row>
        <Row>
            <Col xs={1} />
            <Col xs={7}>
              <Card style={styles.minHeight}>
                {renderRadar}
              </Card>
            </Col>
            <Col xs={3}>
              <Paper style={styles.minHeight} zDepth={3}>
                <h1> blah blah blah something needs to go here </h1>
              </Paper>
            </Col>
            <Col xs={1} />
        </Row>



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
              </SelectField> <br/>
              </form>
          </Dialog>


          <Drawer
            docked={false}
            width={200}
            open={this.state.open2}
            onRequestChange={(open2) => this.setState({open2})}
          >
              <h1 style={styles.center}>My Habits</h1>
            <List>
            {this.state.habitArray.map((habit, index) => {
              return(
                    <ListItem
                      primaryText={habit.name}
                      rightIconButton={
                          <IconMenu iconButtonElement={iconButtonElement} value= { this.state.selectedItem } onChange={ this.menuClicked }>
                            <MenuItem value={habit.name}>More Information</MenuItem>
                            <MenuItem value={index}>Delete</MenuItem>
                          </IconMenu>
                      }
                    />

              )
            })}
            </List>
            </Drawer>

      </div>
    )
  }
}

export default HabitList;
