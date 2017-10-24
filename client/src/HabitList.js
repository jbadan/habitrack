import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import LineChart from './LineChart';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      newItem: '',
      selectedOption: '',
      goal: 0,
      editHabit: '',
      user: this.props.user,
      redirect: false
    }
  }

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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

//100% WORKING
  addItem = (e) => {
    e.preventDefault()
    var updates = this.state.habitArray;
    updates.push({name: this.state.newItem, difficulty: this.state.selectedOption, goal: this.state.goal});
    this.setState({
      habitArray: updates
    })
    //post new item to database
    axios.post('/habit/new',{
      user: this.props.user,
      name: this.state.newItem,
      difficulty: this.state.selectedOption,
      goal: this.state.goal
    }).then(result => {
      //nothing yet
    })
  }

  //not working on db end- works on front end
  deleteHabit = (e) =>{
     e.preventDefault();
     let updates = this.state.habitArray;
     let index = e.target.getAttribute('data-key');
     updates.splice(index, 1);
     this.setState({
       habitArray:  updates
     }, () => {
       let habitName = this.state.habitArray[index].name
       axios.post('/habit/delete', {
         user: this.props.user,
         indexNumber: index,
         name: habitName
       }).then(result => {
         //nothing yet
       })
    })
   }

   editHabitChange = (e) => {
     this.setState({
       editHabit: e.target.value
     })
   }
   editHabitHandler = (e) => {
     e.preventDefault()
     let index = e.target.getAttribute('data-key');
     let newHabitName = this.state.editHabit;
     this.setState({
       editHabit: ''
     })
     //edit name in database
     axios.post('/habit/edit',{

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
       this.setState({
         redirect: true
       })
   }
  render() {
    const{redirect} = this.state;
    if(redirect){
      return <Redirect to ='/habit'/>
    }
    return(
      <div>
        {this.state.habitArray.map((habit, index) => {
          return(
            <div key={index}>
              <button onClick={(e) => this.handleRedirect(e)} data-key={habit.name}>{habit.name}</button>
              <button onClick={(e) => this.handleDate(e)} data-key={habit.name}>I did it</button>
              <form>
                 <input type="text" placeholder={habit.name} onChange={(e) => this.editHabitChange(e)} value={this.state.editHabit}/>
                 <button data-key={index} onClick={(e) => this.editHabitHandler(e)}>Edit</button>
             </form>
             <button onClick={this.deleteHabit} data-key={index}>delete</button>
        </div>
          )
        })}
        <form>
           <input type="text" placeholder="Type a new habit here" onChange={(e) => this.newItemChange(e)} value={this.state.newItem}/>

          <div>What level of difficuty is this task:</div>
         <div className="radio">
           <label>
             <input
               type="radio"
               name="selectedOption"
               value="easy"
               checked={this.state.selectedOption === 'easy'}
               onChange={this.handleOptionChange}
               />
               Easy
           </label>
         </div>
         <div className="radio">
           <label>
             <input
               type="radio"
               name="selectedOption"
               value="medium"
               checked={this.state.selectedOption === 'medium'}
               onChange={this.handleOptionChange}
             />
             Medium
           </label>
         </div>
         <div className="radio">
           <label>
             <input type="radio"
               name="selectedOption"
               value="hard"
               checked={this.state.selectedOption === 'hard'}
               onChange={this.handleOptionChange}
             />
             Hard
           </label>
         </div>

         <label>
              Goal x per week:
         <input
           name="goal"
           type="number"
           min="1"
           max="7"
           value={this.state.goal}
           onChange={this.handleOptionChange} />
       </label>
           <button onClick={(e) => this.addItem(e)}>Add it!</button>
        </form>

        <LineChart />
      </div>
    )
  }
}

export default HabitList;
