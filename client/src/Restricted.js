import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';

const styles = {
    minHeight: "200px",
    marginTop: "80px",
    textAlign: "center"
};

const Restricted = () => {

		return (
			<div>
				<Row>
				<Col xs={3} />
	      <Col xs={6}>
	      	<Card style={styles}>
	      		<CardTitle title="Oops!"/>
	      		<CardText>You must be logged in to view this page.</CardText>
	      	</Card>
	      </Col>
	      <Col xs={3} />
	      </Row>
			</div>
		)

}

export default Restricted;
