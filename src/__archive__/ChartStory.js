import './_styles/ChartStory.css'

import React from 'react'
import Chance from 'chance'
import moment from 'moment'
import _ from 'lodash'
import Lazy from 'lazy.js'
import {text, boolean, number, object, color} from '@kadira/storybook-addon-knobs'

import Chart from '../components/Chart.js'

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

class ChartStory extends React.Component {
  constructor(){
    super()
    //--
    this.randomPoints = this.randomPoints.bind(this)
    //--
    this.state = {
      margin: {top: 30, right: 15, bottom: 80, left: 30},
      maxRadius: 50,
      width: 600,
      height: 400,
      ticks: 10,
      xTicks: 10,
      yTicks: 10,
      xAxis: 'band',
      yAxis: 'linear',
      stroke: GREY,
      fill: BLUE,
      maxColor: RED,
      medColor: YELLOW,
      minColor: GREEN,
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
      const numberOfPoints = chance.d100() * 10
      let data = []
      for (let i = 0; i < numberOfPoints; i++){
        const ap = chance.pickone(AP)
        data.push({
          ID: chance.guid(),
          Timestamp: moment()
                    .hour(chance.hour())
                    .subtract(chance.d30(), 'days')
                    .valueOf(),
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
    const result = Lazy(data).countBy(d => d.NodeName).toArray()
    return result
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
      <div className="ChartStory">
        <div className="ChartStory__toolbar">
          <button onClick={this.randomPoints}>Randomize!</button>        
        </div>
        <Chart data={this.reduceData(data)}
               margin={object('Margin', margin)}
               width={number('Width', width)}
               height={number('Height', height)}
               xTicks={number('X Ticks', xTicks)}
               yTicks={number('Y Ticks', yTicks)}
               stroke={color('Stroke', stroke)}
               fill={color('Fill', fill)}
               {...rest}
        />
      </div>
    )
  }
}

export default ChartStory
