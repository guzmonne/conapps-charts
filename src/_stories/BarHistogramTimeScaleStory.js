import React from 'react'
import moment from 'moment'
import {text, boolean, number, object, color, select} from '@kadira/storybook-addon-knobs'

import {BLUE, DARK_BLUE, INTERVALS} from './variables.js'

import HistogramTimeScaleTooltip from './components/HistogramTimeScaleTooltip.js'
import Histogram from '../components/BarHistogram.js'

const d3 = Object.assign({},
  require('d3-array'),
  require('d3-random')
)

class BarHistogramTimeScaleStory extends React.Component {
  constructor(){
    super()
    //--
    this.randomPoints = this.randomPoints.bind(this)
    //--
    this.state = {
      margin: {top: 30, right: 15, bottom: 40, left: 30},
      width: 600,
      height: 400,
      fill: BLUE,
      stroke: DARK_BLUE,
      xAxis: 'time',
      yAxis: 'linear',
      xTicks: 10,
      yTicks: 10,
      data: [],
    }
  }
  
  componentDidMount() {
    this.randomPoints()
  }
  
  randomLogNormal = d3.randomIrwinHall(24)

  randomPoints = () => {
    let data = []
    const MAX_DAYS = 3
    const POINTS = 5000

    for (let i = 0; i <= POINTS; i++){
      data.push([
        moment()
        .subtract(Math.random() * MAX_DAYS, 'days')
        .hour(this.randomLogNormal() * 1.5)
        .minutes(Math.random() * 60)
        .seconds(Math.random() * 60)
        .milliseconds(Math.random() * 1000)
        .toDate(),
        1
      ])
    }

    this.setState({data})
  }
  
  render() { 
    const {
      data,
      margin,
      width,
      height,
      xTicks,
      yTicks,
      xAxis,
      yAxis,
      stroke,
      fill,
      ...rest
    } = this.state

    const options = {
      linear: 'linear',
      time: 'time',
      scale: 'scale',
    };

    let intervals = [].concat(INTERVALS)
    intervals.sort()
    intervals.reduce((acc, i) => Object.assign(acc, {[i]: i}), {})

    const numberOptions = {min: 0, max: 1, step: 0.1, range: true}

    return (
      <div className="HistogramTimeScaleStory">
        <div className="HistogramTimeScaleStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>
          {' '}
          <label>Visualizing {data.length} random records</label>   
        </div>
        <Histogram data={data}
                   margin={object('Margin', {top: 30, right: 15, bottom: 80, left: 40})}
                   width={number('Width', width)}
                   height={number('Height', height)}
                   xTicks={number('X Ticks', xTicks)}
                   yTicks={number('Y Ticks', yTicks)}
                   padding={number('Padding', 0.4, numberOptions)}
                   stroke={color('Stroke', stroke)}
                   fill={color('Fill', fill)}
                   xGrid={boolean('X Grid', false)}
                   yGrid={boolean('Y Grid', false)}
                   xAxis={select('X Axis', options, xAxis)}
                   yAxis={select('Y Axis', options, yAxis)}
                   thresholds={select('Thresholds', intervals, 'timeDay')}
                   tooltip={<HistogramTimeScaleTooltip />}
                   brush={boolean('Brush', false)}
                   {...rest}
        />
      </div>
    )
  }
}

export default BarHistogramTimeScaleStory
