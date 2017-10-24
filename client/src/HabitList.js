import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';
import LineChart from './LineChart';

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      newItem: '',
      selectedOption: '',
      goal: 0,
      editHabit: ''
    }
  }

  componentDidMount(){
    axios.get('/habit', {
      user:this.props.user
    }).then(result => {
      console.log(result)
      let newArray = this.state.habitArray
      newArray.push(result.habits)
      this.setState({
        habitArray: newArray
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
  deleteHabit = (e) =>{
     e.preventDefault();
     let updates = this.state.habitArray;
     let index = e.target.getAttribute('data-key');
     updates.splice(index, 1);
     this.setState({
       habitArray:  updates
     })
     //remove from database
     let habitName = this.state.habitArray[index].name
     axios.post('/habit/delete', {
       indexNumber: index,
       name: habitName
     }).then(result => {
       //nothing yet
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
  render() {
    return(
      <div>
        {this.state.habitArray.map((habit, index) => {
          return(
            <div key={index}>
              <h3> habit.name </h3>
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
