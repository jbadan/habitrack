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
    let datesArr;
    // this.props.datesArr.length < 10
    //   ? datesArr = [
    //     {date:'21-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'20-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'19-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'18-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'17-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'16-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'25-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'14-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'13-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'12-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'11-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'28-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'23-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'8-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'7-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'6-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'10-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'4-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'3-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'2-Apr-2017',count:Math.floor(Math.random() * 11)},
    //     {date:'1-Apr-2017',count:Math.floor(Math.random() * 11)},
    //   ]
    //   :
      datesArr = this.props.datesArr;

    const dayArr = datesArr.map((day) => {
      var eachDay = day.date
      var d = new Date(eachDay);
      var n = d.getDay(d);
      return n;
    })

    const dayObj = {};
    for(var i = 0; i < dayArr.length; i++){
      if(dayObj[dayArr[i]]){
        dayObj[dayArr[i]]+=1;
      }else{
        dayObj[dayArr[i]] = 1;
      }
    }

    const data = [
    { weekday: 'Sunday', A: dayObj[0], fullMark: 21 },
    { weekday: 'Monday', A: dayObj[1], fullMark: 21 },
    { weekday: 'Tuesday', A: dayObj[2], fullMark: 21 },
    { weekday: 'Wednesday', A: dayObj[3], fullMark: 21 },
    { weekday: 'Thursday', A: dayObj[4], fullMark: 21 },
    { weekday: 'Friday', A: dayObj[5], fullMark: 21 },
    { weekday: 'Saturday', A: dayObj[6], fullMark: 21 },
    ];

    return(
        <ResponsiveContainer width='100%' height={550}>
          <RadarChart className='radar-chart' margin={{top: 20, right: 40, bottom: 20, left: 40}} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="weekday" />
            <PolarRadiusAxis/>
            <Radar name="Habit" dataKey="A" stroke="#FFA726" fill="#FFB74D" fillOpacity={0.5}/>
          </RadarChart>
        </ResponsiveContainer>

    )
  }
}

export default ResponsiveRadarChart;
