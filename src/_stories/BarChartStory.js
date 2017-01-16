import React from 'react'
import {text, boolean, number, object, color, select} from '@kadira/storybook-addon-knobs'
import Chance from 'chance'

import {BLUE, DARK_BLUE} from './variables.js'

import TooltipLinearScale from './TooltipLinearScale.js'
import BarChart from '../components/BarChart.js'

const chance = new Chance()

class BarChartStory extends React.Component {
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
      xAxis: 'band',
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
    let data = []
    const POINTS = 20
    const MAX_Y = 300

    for (let i = 0; i < POINTS; i++) {
      data.push([
        chance.name(),
        Math.floor(Math.random() * MAX_Y)
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

    const numberOptions = {min: 0, max: 1, step: 0.1, range: true}

    return (
      <div className="BarChartStory">
        <div className="BarChartTimeScaleStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>
          {' '}
          <label>Visualizing {data.length} random records</label>   
        </div>
        <BarChart  data={data}
                   margin={object('Margin', {top: 30, right: 15, bottom: 80, left: 40})}
                   width={number('Width', width)}
                   height={number('Height', height)}
                   xTicks={number('X Ticks', xTicks)}
                   yTicks={number('Y Ticks', yTicks)}
                   stroke={color('Stroke', stroke)}
                   fill={color('Fill', fill)}
                   xGrid={boolean('X Grid', true)}
                   yGrid={boolean('Y Grid', true)}
                   xAxis={select('X Axis', options, xAxis)}
                   yAxis={select('Y Axis', options, yAxis)}
                   paddingInner={number('Padding Inner', 0.1, numberOptions)}
                   paddingOuter={number('Padding Outer', 0.1, numberOptions)}
                   tooltip={<TooltipLinearScale />}
                   {...rest}
        />
      </div>
    )
  }
}

export default BarChartStory
