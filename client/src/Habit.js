import React, { Component } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';



const styles = {
  minHeight: {
    minHeight: "300px",
    marginTop: "50px",
  },
  center:{
    textAlign: "center",
  }
};


class Habit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: []
    }
  }



  render() {
    console.log(this.props.habit);
    return(
      <div>
      	<Row>
      	<Col xs={1} />
      	<Col xs={5}>
		      <Card style={styles.minHeight}>
		      	<CardTitle title={this.props.habit.name} style={styles.center}/>
		      	<CardText>Difficulty: {this.props.habit.difficulty}</CardText>
		      	<CardText>My goal is {this.props.habit.goal} days per week!</CardText>
            <CardText>
            
            </CardText>
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
      </div>
    )
  }
}

export default Habit;
