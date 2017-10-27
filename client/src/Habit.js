import React, { Component } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';


const styles = {
  minHeight: {
    minHeight: "300px",
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
      dates: [{date: ''}]
    }
  }

  handleRedirect = () => this.setState({redirect: true});

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

    const {redirect} = this.state;
    if(redirect){
      return <Redirect to ='/display'/>
    };

    return(
      <div>
      	<Row>
      	<Col xs={1} />
      	<Col xs={5}>
		      <Card style={styles.minHeight}>
		      	<CardTitle title={this.props.habit.name} style={styles.center}/>
		      	<CardText>Difficulty: {this.props.habit.difficulty}</CardText>
		      	<CardText>My goal is {this.props.habit.goal} days per week!</CardText>
            {this.state.dates.map((date, index) => {
              return (
                <CardText>{date.date}</CardText>
              )
            })}
		      </Card>
	      </Col>
	      <Col xs={5}>
	      	<Card style={styles.minHeight}>
	      		<CardTitle title="Calendar/Graph" style={styles.center}/>
	      		<CardText>Something here...</CardText>
	      	</Card>
	      </Col>
	      <Col xs={1} />
	      </Row>

        <Row>
          <Col xs={4} />
          <Col xs={4} style={styles.center}>
            <RaisedButton label="Dashboard" primary={true} onClick={this.handleRedirect}/>
          </Col>
          <Col xs={4} />
        </Row>
      </div>
    )
  }
}

export default Habit;
