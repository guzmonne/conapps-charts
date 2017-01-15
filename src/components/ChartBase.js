import '../_styles/Chart.css'

import React, {PropTypes as T} from 'react'
import uniqueId from 'lodash/uniqueId'
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-array')
)
/**
 * @component ChartBase
 * @description Main chart component
 */
class ChartBase extends React.Component {
  constuctor(props) {
    this.setXYScales(props)
  }

  componentWillMount() {
    this.id = uniqueId('Chart')
  }

  componentDidMount() {
    const id = "resize." + this.id
    d3.select(window)
      .on(id, this.forceUpdate.bind(this))
  }
  
  componentWillUnmount() {
    const id = "resize." + this.id
    d3.select(window)
      .on(id, null)
  }

  componentWillReceiveProps(props) {
    if (this.props.xAxis !== props.xAxis){
      this.x = this.setXScale(props)
    }
    if (this.props.yAxis !== props.yAxis){
      this.y = this.setYScale(props)
    }
  }

  width = () => {
    if (!this.container) return 0
    return parseInt(this.container.style('width')) || this.props.width || 0
  }

  height = () => {
    const {width, height} = this.props
    return Math.round(this.width() / (width / height)) || this.props.height || 0
  }

  setXYScales = (props) => {
    this.setXScale(this.props)
    this.setYScale(this.props)
  }

  setXScale = (props) => {
    this.x = this.getScale(props.xAxis, props.data, 0)
  }

  setYScale = (props) => {
    this.y = this.getScale(props.yAxis, props.data, 1)
  }
  
  getScales = () => {
    const {props: {data, xAxis, yAxis}, yScale, xScale} = this
    return  {
      xScale: xScale(data, xAxis),
      yScale: yScale(data, yAxis),
    }
  }
  
  yScale = (data, type) => {
    const scale = this.getScale(type, data, 1)
    return (
      scale
      .range([this.innerHeight(), 0])
    )
  }
  
  xScale = (data, type) => {
    const scale = this.getScale(type, data, 0)
    return (
      scale
      .range([0, this.innerWidth()])
    )
  }
  
  getScale = (type, data, index=0) => {
    let scale
    switch(type) {
      case 'band':
        scale = d3.scaleBand()
                  .domain(data.map(d => d[index]))
                  .paddingOuter(0.1)
                  .paddingInner(0.2)
        break
      case 'time': 
        scale = d3.scaleTime().domain([
          new Date(this.min(data, d => d[index])),
          new Date(this.max(data, d => d[index]))
        ])
        break
      case 'linear': 
      default:
        scale = d3.scaleLinear().domain([
          0,
          d3.max(data, d => d[index])
        ])
    }
    return scale
  }
  
  min = (data=[], getter) => {
    return d3.min(data, getter)
  }
  
  max = (data=[], getter) => {
    return d3.max(data, getter)
  }
  
  innerWidth = () => { 
    const {width, margin} = this.props
    return width - margin.left - margin.right
  }
  
  innerHeight = () => {
    const {height, margin} = this.props
    return height - margin.top - margin.bottom
  }
  
  targetWidth = () => {
    if (!this.container) return 0
    return parseInt(this.container.style('width'))
  }
  
  aspectHeight = (aspect) => {
    return Math.round(this.targetWidth() / aspect)
  }
}

const IChartBase = {
  data: T.array.isRequired,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }),
  width: T.number,
  height: T.number,
  fill: T.string,
  stroke: T.string,
  yAxis: T.string,
  xAxis: T.string,
  xTicks: T.number,
  yTicks: T.number,
  tooltips: T.bool,
  className: T.string,
}

const IChartBaseDefaults = {
  margin: {top: 30, right: 15, bottom: 80, left: 30},
  fill: '#5B5F97',
  stroke: '#0C105E',
  xAxis: 'linear',
  yAxis: 'linear',
  xTicks: 5,
  yTicks: 5,
  tooltips: true,
  className: 'ConappsChart'
}

export default ChartBase
