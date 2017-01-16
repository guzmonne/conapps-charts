const d3 = Object.assign({},
  require('d3-brush'),
  require('d3-selection')
)

import React, {PropTypes as T} from 'react'
import {DARK_BLUE, BLUE} from './variables.js'
import ChartFaC from './ChartFaC.js'
import ChartSVG from './ChartSVG.js'
import XAxis from './XAxis.js'
import YAxis from './YAxis.js'
import XGrid from './XGrid.js'
import YGrid from './YGrid.js'
import TooltipFaC from './TooltipsFaC.js'

class BarChart extends React.Component {
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
      <div className="BarChart">
        <ChartFaC {...this.state} {...this.props}>{({xScale, yScale, w,h,}) => (
        <TooltipFaC>{({tooltipShow, tooltipHide, tooltipState}) => (
        <div className="BarChart__container">
            {tooltip && React.cloneElement(tooltip, tooltipState)}
            <ChartSVG width={width}
                      height={height}
                      margin={margin}>
              <XAxis height={h} scale={xScale} ticks={xTicks}/>
              <YAxis scale={yScale} ticks={yTicks}/>
              <XGrid height={h} scale={xScale}/>
              <YGrid width={w} scale={yScale}/>
            {data.map((d, i) => (
              <rect key={`bar.${i}`} x={xScale(d[0])} y={yScale(d[1])} width={xScale.bandwidth()} height={h - yScale(d[1])}
                    fill={fill} stroke={stroke}/>
            ))}
            </ChartSVG>
        </div>
        )}</TooltipFaC>
        )}</ChartFaC>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
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
  tooltip: T.element,
}

BarChart.defaultProps = {
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
  xGrid: true,
  yGrid: true,
}

export default BarChart