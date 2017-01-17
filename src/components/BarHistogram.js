const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-brush')
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
      padding,
      tooltip,
      thresholds,
    } = this.props
    return (
      <div className="Histograms">
        <ChartFaC {...this.props}>{({w,h}) => (
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
            
            {bins.length > 1 && bins.map((d, i) => (
              <g key={`bar.${i}`} transform={`translate(${xScale(d.x0)}, ${yScale(d.length)})`}>
                <rect fill={fill} stroke={stroke} x="1" width={xScale(d.x1) - xScale(d.x0) - (xScale(d.x1) - xScale(d.x0)) * padding}
                      height={Math.max(0, h - yScale(d.length))} onMouseEnter={e => tooltipShow(e, d)} 
                      onMouseLeave={e => tooltipHide(e, d)} onMouseMove={e => tooltipShow(e, [d.x0, d.length, d.x1])}/>
              </g>
            ))}
            
            </ChartSVG>
        </div>
        )}</TooltipFaC>
        )}</HistogramFaC>
        )}</ChartFaC>
        {brush &&
        <ChartFaC {...this.props} height={150}>{({w, h}) => (
        <HistogramFaC data={data}
                      xAxis={xAxis}
                      xTicks={xTicks}
                      width={w}
                      height={h}
                      thresholds={thresholds}>{({bins, xScale, yScale}) => (
        <BrushFaC width={width} height={150} margin={margin} scale={xScale} brushed={this.brushed}>{({setBrushContext}) => (
          <ChartSVG width={width}
            height={height}
            margin={margin}>
            <XAxis height={h} scale={xScale} ticks={xTicks}/>
            
            <g ref={setBrushContext}>
            {bins.length > 1 && bins.map((d, i) => (
              <g key={`bar.${i}`} transform={`translate(${xScale(d.x0)}, ${yScale(d.length)})`}>
                <rect fill={fill} stroke={stroke} x="1" width={xScale(d.x1) - xScale(d.x0) - (xScale(d.x1) - xScale(d.x0)) * padding}
                      height={Math.max(0, h - yScale(d.length))}/>
              </g>
            ))}
            </g>
          
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
  tooltip: T.element,
  padding: T.number,
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
  brush: false,
  padding: 0.4,
}

export default Histograms