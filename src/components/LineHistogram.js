const d3 = Object.assign({},
  require('d3-selection')
)

import React, {PropTypes as T} from 'react'
import {DARK_BLUE, BLUE} from './variables.js'
import ChartFaC from './ChartFaC.js'
import BrushFaC from './BrushFaC.js'
import ChartSVG from './ChartSVG.js'
import XAxis from './XAxis.js'
import YAxis from './YAxis.js'
import XGrid from './XGrid.js'
import YGrid from './YGrid.js'
import Path from './Path.js'
import Circles from './Circles.js'
import TooltipFaC from './TooltipsFaC.js'
import HistogramFaC from './HistogramFaC.js'

class Histograms extends React.Component {
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
    if (!min ||
        !max || 
        min.toString() === 'Invalid Date' ||
        max.toString() === 'Invalid Date' ||
        min === NaN ||
        max === NaN) {
      return data
    }
    return data.filter(([d]) => d >= min && d <= max)
  }

  binsData = (bins) => (
    bins.map(d => [d.x0, d.length])
  )
  
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
      xAxis,
      xGrid,
      yGrid,
      brush,
      curve,
      curveAlpha,
      tooltip,
      thresholds,
    } = this.props
    return (
      <div className="Histograms">
        <ChartFaC {...this.state} {...this.props}>{({w, h}) => (
        <HistogramFaC data={this.activeData(data)}
                      xAxis={xAxis}
                      xTicks={xTicks}
                      width={w}
                      height={h}
                      thresholds={thresholds}>{({bins, xScale, yScale}) => (
        <TooltipFaC>{({tooltipShow, tooltipHide, tooltipState}) => (
        <div className="Histograms__container">
            {tooltip && React.cloneElement(tooltip, tooltipState)}
            <ChartSVG width={width}
                      height={height}
                      margin={margin}>
              <XAxis height={h} scale={xScale} ticks={xTicks}/>
              <YAxis scale={yScale} ticks={yTicks}/>
            {xGrid &&
              <XGrid height={h} scale={xScale}/>}
            {yGrid && 
              <YGrid width={w} scale={yScale}/>}
              
              
              <Path fill={fill} stroke={stroke} data={this.binsData(bins)} xScale={xScale} yScale={yScale}
                    curve={curve} curveAlpha={curveAlpha}/>
              <Circles data={this.binsData(bins)} xScale={xScale} yScale={yScale} fill={fill}/>
              <Circles data={this.binsData(bins)} xScale={xScale} yScale={yScale} fill={'transparent'} 
                      radius={10} onMouseEnter={tooltipShow} onMouseLeave={tooltipHide}/>
            
            </ChartSVG>
        </div>
        )}</TooltipFaC>
        )}</HistogramFaC>
        )}</ChartFaC>
      {brush &&
        <ChartFaC {...this.props} height={110}>{({w, h}) => (
        <HistogramFaC data={data}
                      xAxis={xAxis}
                      xTicks={xTicks}
                      width={w}
                      height={h}
                      thresholds={thresholds}>{({bins, xScale, yScale}) => (
        <BrushFaC width={width} height={110} margin={margin} scale={xScale} brushed={this.brushed}>{({setBrushContext}) => (
          <ChartSVG width={width}
            height={height}
            margin={margin}>
            <XAxis height={h} scale={xScale} ticks={xTicks}/>
            <Path fill={fill} stroke={stroke} data={this.binsData(bins)} xScale={xScale} yScale={yScale}
                  curve={curve} curveAlpha={curveAlpha} getContext={setBrushContext}/>
          </ChartSVG>
        )}</BrushFaC>
        )}</HistogramFaC>
        )}</ChartFaC>}
      </div>
    )
  }
}

Histograms.propTypes = {
  data: T.arrayOf(T.any).isRequired,
  width: T.number.isRequired,
  height: T.number.isRequired,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }),
  xTicks: T.number,
  yTicks: T.number,
  stroke: T.string,
  fill: T.string,
  xAxis: T.string,
  yAxis: T.string,
  xGrid: T.bool,
  yGrid: T.bool,
  brush: T.bool,
  curve: T.bool,
  curveAlpha: T.number,
  tooltip: T.element,
  thresholds: T.string,
}

Histograms.defaultProps = {
  data: [],
  width: 600,
  height: 400,
  margin: {top: 30, right: 15, bottom: 20, left: 30},
  xTicks: 5,
  yTicks: 5,
  stroke: DARK_BLUE,
  fill: BLUE,
  xAxis: 'linear',
  yAxis: 'linear',
  xGrid: false,
  yGrid: false,
  curve: true,
  curveAlpha: 0.5,
}

export default Histograms