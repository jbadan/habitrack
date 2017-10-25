import React, { Component } from 'react';
import Main from './Main';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import './RadarChart.css';

class ResponsiveRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {



    // const datesArr = this.props.dates
    //function to get a count from each weekday


    // const datesArr = ["01/01/2017","01/02/2017","01/03/2017","01/04/2017","01/05/2017","01/06/2017","01/07/2017","01/07/2017","01/08/2017","01/09/2017","01/10/2017","01/11/2017","01/12/2017","01/13/2017"]
    //
    // dayArr = datesArr.map((day) => {
    //   var d = new Date(day);
    //   var n = d.getDay(d);
    //   return n;
    // })


    const data = [
    { weekday: 'Monday', A: 12, fullMark: 21 },
    { weekday: 'Tuesday', A: 21, fullMark: 21 },
    { weekday: 'Wednesday', A: 6, fullMark: 21 },
    { weekday: 'Thursday', A: 17, fullMark: 21 },
    { weekday: 'Friday', A: 4, fullMark: 21 },
    { weekday: 'Saturday', A: 10, fullMark: 21 },
    ];

    return(
      <div>
        <ResponsiveContainer width={500} height={500}>
          <RadarChart cx={300} cy={250} outerRadius={150} width="100%" height="100%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="weekday" />
            <PolarRadiusAxis/>
            <Radar name="Habit" dataKey="A" stroke="#FFA726" fill="#FFB74D" fillOpacity={0.5}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default ResponsiveRadarChart;
