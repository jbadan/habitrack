import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';
import HabitList from './HabitList';
import Main from './Main';
import Habit from './Habit';
import Restricted from './Restricted';
import Navbar from './Navbar';

//Material ui

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: {},
      user: {},
      habit: {},
      dates: []
    }
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  liftHabitToState = (result) => {
    this.setState({
      habit: result,
      dates: result.dates
    })
  }

  render() {
    let switchStatement = '';
    if(Object.keys(this.state.user).length === 0){
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
          <Route path="/display" render={Restricted} />
          <Route path="/habit" render={Restricted} />
        </Switch>
    }else{
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
          <Route path="/display" render={() => <HabitList user={this.state.user} liftHabit={this.liftHabitToState}/>}/>
          <Route path="/habit" render={() => <Habit user={this.state.user} habit={this.state.habit} dates={this.state.dates}/>} />
        </Switch>
    }
    return (
      <div>
        <Router>
          <div>
            <Navbar user={this.state.user} lift={this.liftTokenToState} />
            {switchStatement}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
