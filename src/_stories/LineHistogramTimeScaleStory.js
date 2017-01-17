import React from 'react'
import {text, boolean, number, object, color, select} from '@kadira/storybook-addon-knobs'
import moment from 'moment'
import {BLUE, DARK_BLUE, INTERVALS} from './variables.js'

import LineHistogram from '../components/LineHistogram.js'
import TooltipTimeScale from './components/TooltipTimeScale.js'

const d3 = Object.assign({},
  require('d3-time-format'),
  require('d3-random')
)

// https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js
// SAMPLE https://jsfiddle.net/ningunaparte/9gm68vmn/
//
// ES LOCATION
// d3.locale Spanish Spain / Español
// https://github.com/mbostock/d3/wiki/Localization

var es_ES = {
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["€", ""],
    "dateTime": "%a %b %e %X %Y",
    "date": "%d/%m/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
};

var ES = d3.timeFormatDefaultLocale(es_ES);

class LineChartTimeScaleStory extends React.Component {
  state = {
    margin: {top: 30, right: 15, bottom: 60, left: 30},
    width: 600,
    height: 400,
    fill: BLUE,
    stroke: DARK_BLUE,
    xAxis: 'time',
    yAxis: 'linear',
    xTicks: 10,
    yTicks: 10,
    data: [],
    mu: number('Mu', 0)
  }

  componentDidMount() {
    this.randomPoints()
  }

  randomLogNormal = d3.randomIrwinHall(24)
  
  randomPoints = () => {
    let data = []
    const MAX_DAYS = 21
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

    let intervals = [].concat(INTERVALS)
    intervals.sort()
    intervals.reduce((acc, i) => Object.assign(acc, {[i]: i}), {})

    return (
      <div className="LineChartTimeScaleStory">
        <div className="LineChartTimeScaleStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>
          {' '}
          <label>Visualizing {data.length} random records</label>   
        </div>
        <LineHistogram data={data}
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
                       brush={boolean('Brush', false)}
                       thresholds={select('Thresholds', intervals, 'timeDay')}
                       tooltip={<TooltipTimeScale />}
                       curve={boolean('Curve', true)}
                       curveAlpha={number('Curve Alpha', 0.5, {min: 0, max: 1, step: 0.1, range: true})}
                       {...rest}
        />  
      </div>
    )
  }
}

export default LineChartTimeScaleStory
