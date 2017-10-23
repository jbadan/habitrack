import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import LineChart from './LineChart';
import { RadarChart, Treemap } from 'react-vis';
import BarChart from './BarChart';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: {}
    }
  }

  liftTokenToState = (token) => {
    this.setState({token: token})
  }

  render() {

    let mydata = [{
      Monday: 7,
      Tuesday: 10,
      Wednesday: 8,
      Thursday: 9,
      Friday: 7,
      Saturday: 3,
      Sunday: 2
    }]

    const data = {
     "title": "analytics",
     "color": "#12939A",
     "children": [
      {
       "title": "cluster",
       "children": [
        {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
        {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
        {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
        {"title": "MergeEdge", "color": "#12939A", "size": 743}
       ]
      },
      {
       "title": "graph",
       "children": [
        {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
        {"title": "LinkDistance", "color": "#12939A", "size": 5731},
        {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
        {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
        {"title": "SpanningTree", "color": "#12939A", "size": 3416}
       ]
      },
      {
       "title": "optimization",
       "children": [
        {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
       ]
      }
     ]
    }

    let domains = [
      {name: 'Monday', domain: [0, 10]},
      {name: 'Tuesday', domain: [0, 10]},
      {name: 'Wednesday', domain: [0, 10]},
      {name: 'Thursday', domain: [0, 10]},
      {name: 'Friday', domain: [0, 10]},
      {name: 'Saturday', domain: [0, 10]},
      {name: 'Sunday', domain: [0, 10]}
    ];

    return (
      <div className="App">
        <div className="SignupBox">
          <Signup lift={this.liftTokenToState} />
        </div>
        <div className="LoginBox">
          <Login lift={this.liftTokenToState} />
        </div>
        <div>
          <BarChart />
        </div>
      </div>
    );
  }
}

export default App;
