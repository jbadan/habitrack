import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import ResponsiveLineChart from './ResponsiveLineChart';
import RadarChart from './RadarChart';
import NotEnoughData from './NotEnoughData';
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
  radioButton: {

  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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


class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      newItem: '',
      editHabit: '',
      user: this.props.user,
      redirect: false,
      difficulty: 'easy',
      value: 0,
      selectedItem: true,
      //open controls dialog box for adding new habit
      open: false,
      //dates added is array of objects- new dates added after task completion
      datesAdded: [],
      dateAndCount: []
    }
  }
  //WORKING
  componentDidMount(){
    axios.post('/habit', {
      user:this.state.user
    }).then(result => {
      //fetches all habits from user
      let newArray = this.state.habitArray
      newArray.push(result.data.habits)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      //fetches all dates and total times users completed a habit
      let dateAndCount = this.state.dateAndCount
      //this is controlling for empty data so we don't end up with a null object pushed to array
      if(result.data.total.length === 0){
        //do nothing
      }else{
        dateAndCount.push(result.data.total)
      }
      //removing counts from data
      let dateOnly = []
      if(dateAndCount.length === 0){
        //do nothing
      }else{
        for(let i=0; i<dateAndCount.length; i++){
          dateOnly.push({"date": dateAndCount[i].date})
        }
        if(dateOnly.length === 0){
          this.setState({
            habitArray: flattened
          })
        }else{
          this.setState({
            habitArray: flattened,
            datesAdded: dateOnly
          })
        }

      }
  })
  }

  newItemChange = (e) => {
    this.setState({
      newItem: e.target.value
    })
  }

  handleOptionChange = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

//WORKING
  addItem = (e) => {
    e.preventDefault()
    var updates = this.state.habitArray;
    updates.push({name: this.state.newItem, difficulty: this.state.difficulty, goal: this.state.value});
    this.setState({
      habitArray: updates,
      open: false
    })
    //post new item to database
    axios.post('/habit/new',{
      user: this.props.user,
      name: this.state.newItem,
      difficulty: this.state.difficulty,
      goal: this.state.value
    }).then(result => {
      //nothing yet
    })
  }

//menu with more and delete
  menuClicked = (event, value) => {
    this.setState({
       selectedItem: value
   }, () => {
     console.log(this.state.selectedItem)
     //if selectedItem is number(ie index then delete has been selected)
     if(Number.isInteger(this.state.selectedItem)){
       let updates = this.state.habitArray;
       let index = this.state.selectedItem;
       console.log(index)
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
        console.log(result.data)
        this.props.liftHabit(result.data);
       })
       this.setState({
         redirect: true
       })
     }
   })
 }
   //adds today's date to database
   //WORKING
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
     })
     //adds newly completed tasks to datesAdded for radar chart
     this.setState({
       datesAdded: dateArray
     })
   }


   handleChange = (event, index, value) => this.setState({value});
   handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    let theData = [
      {date:'21-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'20-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'19-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'18-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'17-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'16-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'15-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'14-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'13-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'12-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'11-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'10-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'9-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'8-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'7-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'6-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'5-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'4-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'3-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'2-Apr-2017',count:Math.floor(Math.random() * 11)},
      {date:'1-Apr-2017',count:Math.floor(Math.random() * 11)},
    ];
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

    return(
      <div>
        <Row>
          <Col xs={1} />
          <Col xs={10} >
            <Card>

            </Card>
          </Col>
          <Col xs={1}/>
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
                        leftCheckbox={<Checkbox onClick={(e) => this.handleDate(e)} value={habit.name}/>}
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

                       <RadioButtonGroup onChange={this.handleOptionChange} name="difficulty" defaultSelected="easy">
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
                         value={this.state.value}
                         onChange={this.handleChange}
                      >
                         <MenuItem value={7} primaryText="Everyday" />
                         <MenuItem value={5} primaryText="Weekdays" />
                         <MenuItem value={2} primaryText="Weekends" />
                         <MenuItem value={1} primaryText="Weekly" />
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
