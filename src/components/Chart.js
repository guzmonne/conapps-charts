import '../_styles/Chart.css'

import React, {PropTypes as T} from 'react'
import uniqueId from 'lodash/uniqueId'
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
class Chart extends React.Component {
  constructor(...args) {
    super(...args)
    //-- function bindings
    this.innerWidth = this.innerWidth.bind(this)
    this.innerHeight = this.innerHeight.bind(this)
    this.getScales = this.getScales.bind(this)
    this.xScale = this.xScale.bind(this)
    this.yScale = this.yScale.bind(this)
    this.max = this.max.bind(this)
    this.min = this.min.bind(this)
    this.targetWidth = this.targetWidth.bind(this)
    this.aspectHeight = this.aspectHeight.bind(this)
    //--
  }
  
  componentDidMount() {
    d3.select(window)
      .on("resize." + this.container.attr('id'), this.forceUpdate.bind(this))
  }
  
  componentWillUnmount() {
    d3.select(window).on("resize." + this.container.attr('id'), null)
  }
  
  componentDidUpdate() {
    const {xTicks, yTicks} = this.props
    const {xScale, yScale} = this.getScales()
    const {xAxis, yAxis, xGrid, yGrid} = this
    d3.select(xAxis)
      .attr('transform', `translate(0, ${this.innerHeight()})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(xTicks)
      )
    d3.select(yAxis)
      .call(
        d3.axisLeft(yScale)
          .ticks(yTicks)
      )
    d3.select(xGrid)
      .attr('transform', `translate(0, ${this.innerHeight()})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(5)
          .tickSize(-this.innerHeight())
          .tickFormat('')
      )
    d3.select(yGrid)
      .call(
        d3.axisLeft(yScale)
          .ticks(5)
          .tickSize(-this.innerWidth())          
          .tickFormat('')
      )
  }
  
  getScales() {
    const {props: {data, xAxis, yAxis}, yScale, xScale} = this
    return  {
      xScale: xScale(data, xAxis),
      yScale: yScale(data, yAxis),
    }
  }
  
  yScale(data, type) {
    const scale = this.getScale(type, data, 1)
    return (
      scale
      .range([this.innerHeight(), 0])
    )
  }
  
  xScale(data, type) {
    const scale = this.getScale(type, data, 0)
    return (
      scale
      .range([0, this.innerWidth()])
    )
  }
  
  getScale(type, data, index=0) {
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
  
  min(data=[], getter) {
    return d3.min(data, getter)
  }
  
  max(data=[], getter) {
    return d3.max(data, getter)
  }
  
  innerWidth() { 
    const {width, margin} = this.props
    return width - margin.left - margin.right
  }
  
  innerHeight() {
    const {height, margin} = this.props
    return height - margin.top - margin.bottom
  }
  
  targetWidth() {
    if (!this.container) return 0
    return parseInt(this.container.style('width'))
  }
  
  aspectHeight(aspect) {
    return Math.round(this.targetWidth() / aspect)
  }
  
  render() {
    const {
      margin,
      width,
      height,
      stroke,
      fill,
      data,
    } = this.props
    
    const {
      xScale,
      yScale
    } = this.getScales()
    
    const w = this.innerWidth()
    const h = this.innerHeight()
    
    const aspect = width/height
    
    return (
      <div className="ChartContainer"
           id={uniqueId('Chart')}
           ref={c => (this.container = d3.select(c))}>
        <svg width={this.targetWidth() || width || 0} 
             height={this.aspectHeight(aspect) || height || 0}
             viewBox={`0 0 ${width || 0} ${height || 0}`}
             preserveAspectRatio="xMinYMid">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="xAxis" ref={c => (this.xAxis = c)}/>
            <g className="yAxis" ref={c => (this.yAxis = c)}/>
            <g className="xGrid" ref={c => (this.xGrid = c)}/>
            <g className="yGrid" ref={c => (this.yGrid = c)}/>
            <g className="Rects">
            {data.map((d, i) => (
              <rect x={xScale(d[0])}
                    y={yScale(d[1])}
                    fill={fill}
                    stroke={stroke}
                    key={i}
                    width={xScale.bandwidth()}
                    height={h - yScale(d[1])}
              />
            ))}
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

Chart.propTypes = {
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
}

Chart.defaultProps = {
  margin: {top: 30, right: 15, bottom: 80, left: 30},
  fill: '#5B5F97',
  stroke: '#0C105E',
  xAxis: 'linear',
  yAxis: 'linear',
  xTicks: 5,
  yTicks: 5,
}

export default Chart
