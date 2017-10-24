import React, { Component } from 'react';
import Main from './Main';
import axios from 'axios';

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitArray: [],
      newItem: ''
    }
  }
  newItemChange = (e) => {
    this.setState({
      newItem: e.target.value
    })
  }
  addItem = (e) => {
    e.preventDefault()
    var updates = this.state.habitArray;
    updates.push({name: this.state.newItem});
    this.setState({
      habitArray: updates
    })
    axios.post('/habit/new',{
      name: this.state.newItem,
      user: this.props.user
    }).then(result => {
      //nothing yet
    })
  }
  render() {
    return(
      <div>
        <form>
           <input type="text" placeholder="Type a new habit here" onChange={(e) => this.newItemChange(e)} value={this.state.newItem}/>
           <button onClick={(e) => this.addItem(e)}>Add it!</button>
        </form>
      </div>
    )
  }
}

export default HabitList;
