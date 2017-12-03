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
import Navbar from './Navbar';
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
  },
  dialog:{
    maxWidth: 400
  },
  paper: {
    height: 300,
    width: 300
  },
  paddingText: {
    paddingLeft: 20,
    paddingRight: 20
  },
  paddingTextTop: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
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
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10) {dd = '0'+dd}
     if(mm<10) {mm = '0'+mm}
     today = mm + '/' + dd + '/' + yyyy;
     var weekend = new Date();
    axios.post('/habit', {
      user:this.state.user,
      date: today
    }).then(result => {
      let newweeklyGoal = result.data.weeklyGoal
      let newCompleteArray = []
      for(let j=0; j<result.data.habits.length; j++){
          //controlling for weekend activities
        if(weekend.getDay() === 6 || weekend.getDay() === 0){
          if(result.data.habits.goal != 5){
            newCompleteArray.push(result.data.habits[j].completed)
          }else{
            //do nothing
          }
        }else{
          if(result.data.habits.goal != 2){
            newCompleteArray.push(result.data.habits[j].completed)
          }
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
     if(this.state.selectedItem.length === 24){
       let updates = this.state.habitArray;
       let id = this.state.selectedItem;
       axios.post('/habit/delete', {
         user: this.props.user,
         habitId: id
       }).then(result => {
         this.setState({
           habitArray:result.data.habits
         })
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
   //change handler for goal setting
   handleChange = (event, index, value) => this.setState({value});

  handleDrawerToggle = () => this.setState({open2: !this.state.open2});

  handleDrawerClose = () => this.setState({open2: false});

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
        renderRadar =   <Card style={styles.minHeight}><RadarChart datesArr={data} /></Card>
        text = <Paper zDepth={3} style={styles.paper}>
          <h4 style={styles.paddingTextTop}>What am I looking at?</h4>
          <p style={styles.paddingText}>This line graph is your total habit overview. The horizontal axis shows a linear progression by date and the vertical axis displays the number of habits you marked as complete that day. </p>
          <p style={styles.paddingText}>The radar graph gives you the same information organized by day of the week. This makes it easier to see your trends by specific weekdays or just the weekend. </p>
        </Paper>
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
        for(let i = 0; i < this.state.habitArray.length; i++){
          if(this.state.habitArray[i].goal === 7 || (this.state.habitArray[i].goal === 5 && (day === "Monday" || day === "Tuesday"|| day === "Wednesday"|| day === "Thursday"|| day === "Friday"))){
          todayArr.push(this.state.habitArray[i])
          }else if(this.state.habitArray[i].goal === 7 || (this.state.habitArray[i].goal === 2 && (day === "Saturday" || day === "Sunday"))){
            todayArr.push(this.state.habitArray[i])
          }
        }

    return(
      <div style={styles.bg}>
      <Navbar user={this.props.user} lift={this.props.liftTokenToState} signOut={this.props.signOut} />
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
              <Col xs={10} sm={6}>
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
        <Row style={styles.moveDown}></Row>
        <Row>
          <Col xs={1} />
          <Col xs={10}>
            <Card>
              {lineChart}
            </Card>
          </Col>
          <Col xs={1}/>
        </Row>
        <Row style={styles.moveDown}></Row>
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



        <Dialog
          open={this.state.open}
          onRequestClose = {this.handleClose}
          actions={actions}
          contentStyle={styles.dialog}
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
                            <MenuItem value={habit._id}>Delete</MenuItem>
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
