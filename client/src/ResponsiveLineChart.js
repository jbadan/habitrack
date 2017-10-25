import React, { Component } from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';
import LineChart from './LineChart';
import './Responsive.css';
import { Row, Col } from 'react-flexbox-grid'

class ResponsiveLineChart extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    }
  }

  render() {
    const { width, height } = this.state.dimensions
    const className = classNames(
      (width < 600) && 'small-width-modifier'
    )
    console.log(this.props.data);

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds })
        }}
      >
      {({ measureRef }) =>
        <div ref={measureRef} className={className}>
          <p>Width: {this.state.dimensions.width}</p>
          <LineChart width={this.state.dimensions.width} data={this.props.data}/>
        </div>
      }
      </Measure>
    )
  }
}

export default ResponsiveLineChart;
