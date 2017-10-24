import React, { Component } from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';
import LineChart from './LineChart';
import Grid from 'material-ui/Grid';

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
          <Grid container spacing={24}>
            <Grid item xs={12} sm={8}>
              <LineChart width={this.state.dimensions.width} />
            </Grid>
          </Grid>
        </div>
      }
      </Measure>
    )
  }
}

export default ResponsiveLineChart;
