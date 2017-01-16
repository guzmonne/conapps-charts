import React from 'react'
import {text, boolean, number, object, color, select} from '@kadira/storybook-addon-knobs'
import {BLUE, DARK_BLUE} from './variables.js'
import LineChart from '../components/LineChart.js'
import LineChartTooltip from './LineChartLinearScaleTooltip.js'

class LineChartTimeScaleStory extends React.Component {
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
  
  randomPoints = () => {
    let data = []
    const POINTS = 200
    const MAX_X = 1500
    const MAX_Y = 300

    for (let i = 0; i <= POINTS; i++){
      data.push([
        Math.floor(Math.random() * MAX_X),
        Math.floor(Math.random() * MAX_Y)
      ])  
    }

    data = data.sort((a, b) => a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0)

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
      time: 'time',
      scale: 'scale',
    };

    return (
      <div className="LineChartTimeScaleStory">
        <div className="LineChartTimeScaleStory__toolbar">
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
                   tooltip={<LineChartTooltip />}
                   {...rest}
        />
      </div>
    )
  }
}

export default LineChartTimeScaleStory
