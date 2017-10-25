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
import Signup from './Signup';
import Login from './Login';

//Material ui
import AppBar from 'material-ui/AppBar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: {},
      user: {},
      habit: {}
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
      habit: result
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
          <Route path="/habit" render={() => <Habit user={this.state.user} habit={this.state.habit}/>} />
        </Switch>
    }
    return (
      <div>
        <Router>
          <div>
            <AppBar
              title="HabiTracker"
            >
              <Signup lift={this.liftTokenToState} />
              <Login lift={this.liftTokenToState} user={this.state.user} />
            </AppBar>
            {switchStatement}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
