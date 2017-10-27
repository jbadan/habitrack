import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import {
  Redirect
} from 'react-router-dom';

const styles = {
    minHeight: "200px",
    marginTop: "80px",
    textAlign: "center"
};

const Restricted = () => {
  return <Redirect to ='/'/>
}

export default Restricted;
