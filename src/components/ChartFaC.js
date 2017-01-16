import '../_styles/Chart.css'

import React, {PropTypes as T} from 'react'
import uniqueId from 'lodash/uniqueId'
import isDate from 'lodash/isDate'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'

const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-array'),
  require('d3-axis')
)

/**
 * @component Chart
 * @description Main chart component
 */
class ChartFaC extends React.Component {
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
    const {min, max, paddingOuter, paddingInner} = this.props
    switch(type) {
      case 'band':
        scale = d3.scaleBand()
                  .domain(data.map(d => d[index]))
                  .paddingOuter(paddingOuter)
                  .paddingInner(paddingInner)
        break
      case 'time': 
        scale = d3.scaleTime()
                  .domain([
                    this.brushForIndex(index) && isDate(min) && min.toString() !== 'Invalid Date' 
                      ? min 
                      : new Date(this.min(data, d => d[index])),
                    this.brushForIndex(index) && isDate(max) && max.toString() !== 'Invalid Date' 
                      ? max 
                      : new Date(this.max(data, d => d[index]))
                  ])
        break
      case 'linear': 
      default:
        scale = d3.scaleLinear()
                  .domain([
                    this.brushForIndex(index) && !isNaN(min) && isNumber(min)
                      ? min 
                      : this.min(data, d => d[index]),
                    this.brushForIndex(index) && !isNaN(max) && isNumber(max) 
                      ? max 
                      : this.max(data, d => d[index])
                  ])
    }
    return scale
  }

  brushForIndex = (index) => {
    const {XBrush, YBrush} = this.props
    return (XBrush && index === 0) || (YBrush && index === 1)
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
  
  render() {
    const {
      width,
      height,
      children,
    } = this.props
    
    const {
      xScale,
      yScale
    } = this.getScales()

    const w = this.innerWidth()
    const h = this.innerHeight()
    
    return children({
      xScale,
      yScale,
      w,
      h,
    })
    
  }
}

ChartFaC.propTypes = {
  children: T.func.isRequired,
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
  showXAxis: T.bool,
  showYAxis: T.bool,
  xTicks: T.number,
  yTicks: T.number,
  xGrid: T.bool,
  yGrid: T.bool,
  tooltip: T.element,
  className: T.string,
  XBrush: T.bool,
  YBrush: T.bool,
  paddingInner: T.number,
  paddingOuter: T.number,
}

ChartFaC.defaultProps = {
  margin: {top: 30, right: 15, bottom: 40, left: 30},
  fill: '#5B5F97',
  stroke: '#0C105E',
  xAxis: 'linear',
  yAxis: 'linear',
  showXAxis: true,
  showYAxis: true,
  xTicks: 5,
  yTicks: 5,
  xGrid: true,
  yGrid: true,
  XBrush: true,
  YBrush: false,
  className: 'ChartContainer',
  paddingOuter: 0.1,
  paddingInner: 0.2,
}

export default ChartFaC
