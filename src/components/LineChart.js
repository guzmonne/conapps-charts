import '../_styles/LineChart.css'

const d3 = Object.assign({},
  require('d3-brush'),
  require('d3-selection')
)

import React, {PropTypes as T} from 'react'
import {BLUE} from './variables.js'
import ChartFaC from './ChartFaC.js'
import ChartSVG from './ChartSVG.js'
import XAxis from './XAxis.js'
import YAxis from './YAxis.js'
import XGrid from './XGrid.js'
import YGrid from './YGrid.js'
import Path from './Path.js'
import Circles from './Circles.js'
import TooltipFaC from './TooltipsFaC.js'
import BrushFaC from './BrushFaC.js'

class LineChart extends React.Component {
  state = {
    min: undefined,
    max: undefined,
  }

  componentWillReceiveProps({brush}) {
    if (brush === false) {
      this.setState({min: undefined, max: undefined})
    }
  }

  brushed = ([min, max]) => {
    this.setState({min, max})
  }
  
  activeData = () => {
    const {min, max} = this.state
    const {data} = this.props
    if (!min || !max || min.toString() === 'Invalid Date' || max.toString() === 'Invalid Date') return data
    return data.filter(([d]) => d > min && d < max)
  }

  render() {
    const {
      data,
      width,
      height,
      margin,
      fill,
      stroke,
      xTicks,
      yTicks,
      tooltip,
      brush,
      curve,
      curveAlpha,
    } = this.props
    return (
      <div className="LineChart">
        <ChartFaC {...this.state} {...this.props}>{({xScale, yScale, w,h,}) => (
        <TooltipFaC>{({tooltipShow, tooltipHide, tooltipState}) => (
        <div className="LineChart__container">
            {tooltip && React.cloneElement(tooltip, tooltipState)}
            <ChartSVG width={width}
                      height={height}
                      margin={margin}>
              <XAxis height={h} scale={xScale} ticks={xTicks}/>
              <YAxis scale={yScale} ticks={yTicks}/>
              <XGrid height={h} scale={xScale}/>
              <YGrid width={w} scale={yScale}/>
              <Path fill={fill} stroke={stroke} data={this.activeData()} xScale={xScale} yScale={yScale}
                    curve={curve} curveAlpha={curveAlpha}/>
              <Circles data={this.activeData()} xScale={xScale} yScale={yScale} fill={fill}/>
              <Circles data={this.activeData()} xScale={xScale} yScale={yScale} fill={'transparent'} 
                      radius={10} onMouseEnter={tooltipShow} onMouseLeave={tooltipHide}/>
            </ChartSVG>
        </div>
        )}</TooltipFaC>
        )}</ChartFaC>
      {brush &&
        <ChartFaC {...Object.assign({}, this.props, {height: 100})}>{({xScale, yScale, w, h}) => (
        <BrushFaC width={width} margin={margin} scale={xScale} brushed={this.brushed}>{({setBrushContext}) => (
        <div className="LineChart__container" ref={c => this.context = c}>
          <ChartSVG width={width}
                    height={100}
                    margin={margin}>
            <XAxis height={h} scale={xScale} ticks={xTicks}/>
            <XGrid height={h} scale={xScale}/>
            <YGrid width={w} scale={yScale}/>
            <Path fill={fill} stroke={stroke} data={data} xScale={xScale} yScale={yScale}
                  getContext={setBrushContext} curve={curve} curveAlpha={curveAlpha}/>
          </ChartSVG>
        </div>
        )}</BrushFaC>
        )}</ChartFaC>}
      </div>
    )
  }
}

LineChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
  width: T.number.isRequired,
  height: T.number.isRequired,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }),
  fill: T.string,
  stroke: T.string,
  xTicks: T.number,
  yTicks: T.number,
  tooltip: T.element,
  brush: T.bool,
  curve: T.bool,
  curveAlpha: T.number,
}

LineChart.defaultProps = {
  data: [],
  margin: {top: 30, right: 15, bottom: 20, left: 30},
  tooltips: true,
  stroke: BLUE,
  fill: 'transparent',
}

export default LineChart