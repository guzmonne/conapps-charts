import React from 'react'
import uniqBy from 'lodash/uniqBy'
import {text, boolean, number, object, color, select} from '@kadira/storybook-addon-knobs'
import {BLUE, DARK_BLUE} from './variables.js'
import LineChart from '../components/LineChart.js'
import TooltipLinearScale from './components/TooltipLinearScale.js'

const d3 = Object.assign({},
  require('d3-random'),
)

class LineChartLinearScaleStory extends React.Component {
  state = {
    margin: {top: 30, right: 15, bottom: 40, left: 30},
    width: 600,
    height: 400,
    fill: BLUE,
    stroke: DARK_BLUE,
    xAxis: 'linear',
    yAxis: 'linear',
    xTicks: 10,
    yTicks: 10,
    data: [],
  }

  componentDidMount() {
    this.randomPoints()
  }

  randomLogNormal = d3.randomNormal(0, 0.2)
  
  randomPoints = () => {
    let data = []
    const POINTS = 200
    const MAX = 100

    for (let i = 0; i <= POINTS; i++){
      data.push([
        i,
        Math.round(Math.abs(this.randomLogNormal() * MAX))
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
      stroke,
      xAxis,
      yAxis,
      fill,
      ...rest
    } = this.state

    const options = {
      linear: 'linear',
      time: 'Time',
      scale: 'scale',
    };

    return (
      <div className="LineChartLinearScaleStory">
        <div className="LineChartLinearScaleStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>
          {' '}
          <label>Visualizing {data.length} random records</label>   
        </div>
        <LineChart data={data}
                   margin={object('Margin', margin)}
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
                   brush={boolean('Brush', true)}
                   tooltip={<TooltipLinearScale />}
                   curve={boolean('Curve', true)}
                   curveAlpha={number('Curve Alpha', 0.5, {min: 0, max: 1, step: 0.1, range: true})}
                   {...rest}
        />
      </div>
    )
  }
}

export default LineChartLinearScaleStory
