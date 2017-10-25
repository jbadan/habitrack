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
import ResponsiveLineChart from './ResponsiveLineChart';
import { Col, Row } from 'react-flexbox-grid';


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
    ]
    // Formatting data
    theData.forEach(function(d) {
      d.date = Date.parse(d.date);
      d.count = +d.count;
    });
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
          <Route path="/display" render={() => <HabitList user={this.state.user}/>}/>
          <Route path="/habit" render={() => <Habit />} />
        </Switch>
    }
    return (
      <div>
        <Router>
          {switchStatement}
        </Router>
        <Row>
          <Col xs={0} sm={2} md={2} lg={2} />
          <Col xs={12} sm={8} md={8} lg={8} >
            <ResponsiveLineChart data={theData} />
          </Col>
          <Col xs={0} sm={2} md={2} lg={2} />
        </Row>
      </div>
    );
  }
}

export default App;
