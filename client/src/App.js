import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import LineChart from './LineChart';
import HabitList from './HabitList';
import Main from './Main';
import Habit from './Habit';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: {},
      user: {}
    }
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  render() {

    return (
      <Router>
      <div>
          <nav>
            <div>
              <div>
                <img src="#"/>
                <Link to="/" href="#">Home</Link>
              </div>
            </div>
          </nav>
          <Switch>
           <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
           <Route path="/display" render={() => <HabitList user={this.state.user}/>}/>
           <Route path="/habit" render={() => <Habit />}/>
          </Switch>
          <LineChart />
      </div>
    </Router>
    );
  }
}

export default App;
