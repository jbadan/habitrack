import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import ResponsiveLineChart from './ResponsiveLineChart';
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

const styles = {
  radioButton: {

  }
};


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
      value: 0
    }
  }
  //WORKING
  componentDidMount(){
    axios.post('/habit', {
      user:this.state.user
    }).then(result => {
      let newArray = this.state.habitArray
      newArray.push(result.data)
      let flattened = newArray.reduce((a, b) => a.concat(b), [])
      this.setState({
        habitArray: flattened
      })
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
      habitArray: updates
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

  //WORKING
  deleteHabit = (e) =>{
     e.preventDefault();
     let updates = this.state.habitArray;
     let index = e.target.getAttribute('data-key');
     let habitName = e.target.getAttribute('data-name');
     updates.splice(index, 1);
     this.setState({
       habitArray:  updates
     })
     axios.post('/habit/delete', {
       user: this.props.user,
       indexNumber: index,
       name: habitName
     }).then(result => {
       //nothing yet
     })
    }

   //adds today's date to database
   //WORKING
   handleDate = (e) => {
     e.preventDefault()
     let habitName = e.target.getAttribute('data-key');
     //get today's date
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
      if(dd<10) {dd = '0'+dd}
      if(mm<10) {mm = '0'+mm}
      today = mm + '/' + dd + '/' + yyyy;
     axios.post('/habit/date', {
       user: this.props.user,
       date: today,
       name: habitName
     })
   }

   //handles redirect to {Habit} component
   //WORKING
   handleRedirect = (e) => {
     e.preventDefault()
     let habitName = e.target.getAttribute('data-key');
     console.log(habitName);
     axios.post('/habit/details', {
      user: this.props.user,
      name: habitName
     })
     this.setState({
       redirect: true
     })
   }

   handleChange = (event, index, value) => this.setState({value});
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
    // Formatting data
    theData.forEach(function(d) {
      d.date = Date.parse(d.date);
      d.count = +d.count;
    });
    const{redirect} = this.state;
    if(redirect){
      return <Redirect to ='/habit'/>
    }
    return(
      <div>
        {this.state.habitArray.map((habit, index) => {
          return(
            <Card key={index}>
              <CardTitle onClick={(e) => this.handleRedirect(e)} data-key={habit.name} title={habit.name}/>
              <RaisedButton label="Complete" onClick={(e) => this.handleDate(e)} data-key={habit.name}/>
             <RaisedButton label="X"  onClick={this.deleteHabit} data-name={habit.name} data-key={index}/>
        </Card>
          )
        })}
        <Card>
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

           <FlatButton onClick={(e) => this.addItem(e)} label="Add new habit"/>
        </form>
        </Card>
        <Row>
          <Col xs={0} sm={2} md={2} lg={2} />
          <Col xs={12} sm={8} md={8} lg={8} >
            <ResponsiveLineChart data={theData} />
          </Col>
          <Col xs={0} sm={2} md={2} lg={2} />
        </Row>
      </div>
    )
  }
}

export default HabitList;
