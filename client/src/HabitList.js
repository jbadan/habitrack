import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      newItem: '',
      selectedOption: '',
      goal: 0
    }
  }
  
  componentDidMount(){
    axios.get('/habit', {
      user:this.props.user
    }).then(result => {
      console.log(result)
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
      itemArray: updates
    })
    axios.post('/habit/new',{
      user: this.props.user,
      name: this.state.newItem,
      difficulty: this.state.selectedOption,
      goal: this.state.goal
    }).then(result => {
      //nothing yet
    })
  }
  render() {
    return(
      <div>
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
      </div>
    )
  }
}

export default HabitList;
