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

class HistogramTimeScaleStory extends React.Component {
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
  
  randomPoints() {
    const randomX = (x) => Math.floor(Math.random() * x)

    const data = d3.range(1000).map(() => [
      new Date(2016, 11, randomX(31), randomX(1), randomX(60)), 
      1
    ])

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
                    stroke={color('Stroke', stroke)}
                    fill={color('Fill', fill)}
                    xGrid={boolean('X Grid', false)}
                    yGrid={boolean('Y Grid', false)}
                    xAxis={select('X Axis', options, xAxis)}
                    yAxis={select('Y Axis', options, yAxis)}
                    thresholds={select('Thresholds', intervals, 'timeDay')}
                    tooltip={<HistogramTimeScaleTooltip />}
                    {...rest}
        />
      </div>
    )
  }
}

export default HistogramTimeScaleStory
