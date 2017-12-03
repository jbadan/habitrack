import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect
  } from 'react-router-dom';
import './App.css';
import HabitList from './HabitList';
import Main from './Main';
import Habit from './Habit';
import Restricted from './Restricted';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Test from './Test';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      habit: {},
      dates: [],
    }
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user,
    })
  }

  liftHabitToState = (result) => {
    this.setState({
      habit: result,
      dates: result.dates
    })
  }
  signOut= (data) => {
    this.setState({
      token: '',
      user: {}
    });
    localStorage.removeItem('mernToken');
  }

  isLoggedIn = () => {
    // If there is a token in localStorage
    // console.log('did something');
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        // console.log(localStorage.mernToken);
        this.setState({
          token: response.data.token,
          user: response.data.user
        })

        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  componentWillMount = () => {
    this.isLoggedIn();
  }

  render() {

    let switchStatement = '';
    if (Object.keys(this.state.user).length === 0) {
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
          <Route path="/display" render={Restricted} />
          <Route path="/habit" render={Restricted} />
          <Route path="*" render={NotFound} status={404} />
        </Switch>
    } else {
       switchStatement =
        <Switch>
          <Route exact path="/" render={() => <Main user={this.state.user} lift={this.liftTokenToState}/>} />
          <Route path="/display" render={() => <HabitList user={this.state.user} isLoggedIn={this.isLoggedIn} liftHabit={this.liftHabitToState}/>}/>
          <Route path="/habit" render={() => <Habit user={this.state.user} isLoggedIn={this.isLoggedIn} habit={this.state.habit} dates={this.state.dates}/>} />
          <Route path="/fakeData" component={Test}/>
          <Route path="*" render={NotFound} status={404} />
        </Switch>
    }
    return (
      <div>
        <Router>
          <div>
            <Navbar user={this.state.user} lift={this.liftTokenToState} signOut={this.signOut} />
            {switchStatement}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
