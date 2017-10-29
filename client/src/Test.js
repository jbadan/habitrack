import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {

  componentDidMount(){
    axios.get('/fakeData', {
    }).then(result => {
    //do nothing
  })
}

  render() {
    return(
      <div> adding fake data </div>

)}
}
export default Test;
