import React from 'react'
import Chance from 'chance'
import moment from 'moment'
import _ from 'lodash'
import Lazy from 'lazy.js'
import {text, boolean, number, object, color} from '@kadira/storybook-addon-knobs'

import LineChart from '../components/LineChart.js'

const chance = new Chance()

const GREY = '#B8B8D1'
const BLUE = '#5B5F97'
const YELLOW = '#FFDC42'
const WHITE = '#FFFFFB'
const GREEN = '#5FBF74'
const RED = '#FF4747'

const HEXA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'F']

const randomMac = () => (
	_.chunk(_.range(12).map(i => chance.pickone(HEXA)), 2)
	.join(':')
	.replace(/,/g, '')
	.toLowerCase()
)

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

class LineChartStory extends React.Component {
  constructor(){
    super()
    //--
    this.randomPoints = this.randomPoints.bind(this)
    //--
    this.state = {
      width: 600,
      height: 400,
      xTicks: 10,
      yTicks: 10,
      data: [],
    }
  }
  
  componentDidMount() {
    this.randomPoints()
  }
  
  randomPoints() {
    this.setState(state => {
      let AP = []
      for (let i = 0; i < chance.d4()*5; i++){
        AP.push({
          Mac: randomMac(),
          Name: chance.name(),
          LocationID: chance.guid(),
          LocationName: chance.address(),
          Tags: _.range(chance.d4()).map(x => chance.word())
        })
      }
      const numberOfPoints = chance.d10() * 30
      let data = []
      for (let i = 0; i < numberOfPoints; i++){
        const ap = chance.pickone(AP)
        const date = moment()
                    .hour(chance.hour())
                    .subtract(chance.d30(), 'days')
        data.push({
          ID: chance.guid(),
          Timestamp: date.valueOf(),
          Year: date.year(),
          Month: date.month(),
          Week: date.week(),
          DayOfMonth: date.date(),
          DayOfYear: date.dayOfYear(),
          Hour: date.hour(),
          Minutes: date.minutes(),
          Provider: chance.pickone(['facebook', 'google', 'local']),
          Gender: chance.pickone(['male', 'female']),
          ClientMac: randomMac(),
          NodeMac: ap.Mac,
          NodeName: ap.Name,
          LocationID: ap.LocationID,
          LocationName: ap.LocationName,
          Tags: ap.Tags,
        })
      }
      return {numberOfPoints, data}
    })
  }
  
  reduceData(data) {
    const result = (
      Lazy(data)
      .countBy(d => `${d.Year} ${('0' + d.Month).slice(-2)} ${('0' + d.DayOfMonth).slice(-2)}`)
      .sortBy(([date]) => date)
      .map(([date, count]) => [new Date(...date.split(' ')), count])
      .toArray()
    )
    return result || [[], []]
  }
  
  render() { 
    const {
      data,
      margin,
      width,
      height,
      xTicks,
      yTicks,
      stroke,
      fill,
      ...rest
    } = this.state

    return (
      <div className="LineChartStory">
        <div className="LineChartStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>
          {' '}
          <label>Visualizing {data.length} random records</label>   
        </div>
        <LineChart data={this.reduceData(data)}
                   margin={object('Margin', margin)}
                   width={number('Width', width)}
                   height={number('Height', height)}
                   xTicks={number('X Ticks', xTicks)}
                   yTicks={number('Y Ticks', yTicks)}
                   stroke={color('Stroke', stroke)}
                   fill={color('Fill', fill)}
                   xGrid={boolean('X Grid', true)}
                   yGrid={boolean('Y Grid', true)}
                   tooltips={boolean('Tooltips', true)}
                   {...rest}
        />
      </div>
    )
  }
}

export default LineChartStory
