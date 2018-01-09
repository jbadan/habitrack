import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-flexbox-grid';
import RadarChart from '../DataVis/RadarChart';
import NotEnoughData from '../Other/NotEnoughData';
import Navbar from '../Main/Navigation/Navbar';

import {Card, CardTitle, RaisedButton, Drawer, List, ListItem} from 'material-ui';

import {BrowserRouter as Router, Redirect} from 'react-router-dom';


const styles = {
  minHeight: {
    minHeight: "500px",
    marginTop: "50px",
  },
  center:{
    marginTop: "10px",
    textAlign: "center",
  }
};


class Habit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      ready: false,
      dates: [{date: ''}],
      open2: false,
    }
  }

  handleRedirect = () => this.setState({
    redirect: true
  });

  handleDrawerToggle = () => this.setState({open2: !this.state.open2});

  render() {

    setTimeout(function() {
      let dates;
      axios.post('/habit/dates', {
        user: this.props.user,
        name: this.props.habit.name
      }).then(result => {
        dates = result.data
        if (this.state.ready === false) {
          this.setState({
            dates: dates,
            ready: true
          })
        }
      })
    }.bind(this), 100);

    let renderRadar = ''
    if(this.state.dates.length === 0){
      renderRadar = <NotEnoughData />
    }else{
      renderRadar = <RadarChart datesArr={this.state.dates} />
    }

    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/display'/>
    };

    return(
      <div>
        <Navbar user={this.props.user} lift={this.props.lift} signOut={this.props.signOut} />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open2}
            onRequestChange={(open2) => this.setState({open2})}
          >
            <h3 style={styles.center}>Task completed on these days:</h3>
            <List>
              {this.state.dates.map((date, index) => {
                return(
                  <ListItem primaryText={date.date} />
                )
              })}
            </List>
          </Drawer>

      	<Row>
      	<Col sm={1} />
      	<Col xs={12} sm={4}>
		      <Card style={styles.minHeight}>
		      	<CardTitle title={this.props.habit.name} style={styles.center}/>
		      	<CardTitle>Difficulty: {this.props.habit.difficulty}</CardTitle>
		      	<CardTitle>My goal is {this.props.habit.goal} days per week!</CardTitle>
		      </Card>
	      </Col>
	      <Col xs={12} sm={6}>
	      	<Card style={styles.minHeight}>
	      		{renderRadar}
	      	</Card>
	      </Col>
	      <Col sm={1} />
	      </Row>

        <Row>
          <Col sm={1} />
          <Col xs={12} sm={4} style={styles.center}>
            <RaisedButton label="See Dates" primary={true} onClick={this.handleDrawerToggle}/>
          </Col>
          <Col xs={12} sm={6} style={styles.center}>
            <RaisedButton label="Dashboard" primary={true} onClick={this.handleRedirect}/>
          </Col>
          <Col sm={1} />
        </Row>
      </div>
    )
  }
}

export default Habit;
