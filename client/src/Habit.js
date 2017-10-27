import React, { Component } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import RadarChart from './RadarChart';
import NotEnoughData from './NotEnoughData';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';


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
      test: 'blah',
      dates: [{date: ''}],
      open2: false,
    }
  }

  handleRedirect = () => this.setState({redirect: true});

  handleDrawerToggle = () => this.setState({open2: !this.state.open2});

  render() {

    let dates;
    axios.post('/habit/dates', {
      user: this.props.user,
      name: this.props.habit.name
    }).then(result => {
      dates = result.data
      console.log(dates);
      console.log(dates[0].date);
      if (this.state.test === 'blah') {
        console.log('yoooo')
        this.setState({
          test: 'foo',
          dates: dates
        })
      }
    })

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
          <Drawer
            docked={false}
            width={200}
            open={this.state.open2}
            onRequestChange={(open2) => this.setState({open2})}
          >
            <h1 style={styles.center}>All Dates</h1>
            <List>
              {this.state.dates.map((date, index) => {
                return(
                  <ListItem primaryText={date.date} />
                )
              })}
            </List>
          </Drawer>

      	<Row>
      	<Col xs={1} />
      	<Col xs={5}>
		      <Card style={styles.minHeight}>
		      	<CardTitle title={this.props.habit.name} style={styles.center}/>
		      	<CardText>Difficulty: {this.props.habit.difficulty}</CardText>
		      	<CardText>My goal is {this.props.habit.goal} days per week!</CardText>
		      </Card>
	      </Col>
	      <Col xs={5}>
	      	<Card style={styles.minHeight}>
	      		{renderRadar}
	      	</Card>
	      </Col>
	      <Col xs={1} />
	      </Row>

        <Row>
          <Col xs={1} />
          <Col xs={5} style={styles.center}>
            <RaisedButton label="See Dates" primary={true} onClick={this.handleDrawerToggle}/>
          </Col>
          <Col xs={5} style={styles.center}>
            <RaisedButton label="Dashboard" primary={true} onClick={this.handleRedirect}/>
          </Col>
          <Col xs={1} />
        </Row>
      </div>
    )
  }
}

export default Habit;
