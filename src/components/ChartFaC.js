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
class ChartFaC extends React.Component {
  componentWillMount() {
    this.id = uniqueId('Chart')
  }

  componentDidMount() {
    const id = "resize." + this.container.attr('id')
    d3.select(window)
      .on(id, this.forceUpdate.bind(this))
  }
  
  componentWillUnmount() {
    const id = "resize." + this.container.attr('id')
    d3.select(window)
      .on(id, null)
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

  mouseCoordinates = (e) => {
    const {nativeEvent: {offsetX, offsetY}} = e
    return [offsetX, offsetY]
  }
  
  render() {
    const {
      margin,
      width,
      height,
      stroke,
      fill,
      data,
      xGrid,
      yGrid,
      className,
      tooltip,
      children,
    } = this.props
    
    const {
      xScale,
      yScale
    } = this.getScales()

    const {
      mouseCoordinates
    } = this
    
    const w = this.innerWidth()
    const h = this.innerHeight()
    
    const aspect = width / height
    
    return (
      <div className={className}
           id={this.id}
           ref={c => (this.container = d3.select(c))}>
        {tooltip ? tooltip : <none/>}
        <svg width={this.targetWidth() || width || 0} 
             height={this.aspectHeight(aspect) || height || 0}
             viewBox={`0 0 ${width || 0} ${height || 0}`}
             ref={c => (this.svg = c)}
             preserveAspectRatio="xMinYMid">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="xAxis" ref={c => (this.xAxis = c)}/>
            <g className="yAxis" ref={c => (this.yAxis = c)}/>
          {xGrid &&  
            <g className="xGrid" ref={c => (this.xGrid = c)}/>}
          {yGrid &&
            <g className="yGrid" ref={c => (this.yGrid = c)}/>}
            {children({
              data,
              xScale,
              yScale,
              fill,
              stroke,
              w,
              h,
              mouseCoordinates,
            })}
          </g>
        </svg>
      </div>
    )
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
  xTicks: T.number,
  yTicks: T.number,
  xGrid: T.bool,
  yGrid: T.bool,
  tooltip: T.element,
  className: T.string,
}

ChartFaC.defaultProps = {
  margin: {top: 30, right: 15, bottom: 80, left: 30},
  fill: '#5B5F97',
  stroke: '#0C105E',
  xAxis: 'linear',
  yAxis: 'linear',
  xTicks: 5,
  yTicks: 5,
  xGrid: true,
  yGrid: true,
  className: 'ChartContainer',
}

export default ChartFaC
