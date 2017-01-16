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
import TooltipFaC from './TooltipsFaC.js'

class BarChart extends React.Component {
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
  fill: T.string,
  stroke: T.string,
  xTicks: T.number,
  yTicks: T.number,
  tooltip: T.element,
}

BarChart.defaultProps = {
  data: [],
  margin: {top: 30, right: 15, bottom: 20, left: 30},
  tooltips: true,
  stroke: BLUE,
  fill: 'transparent',
}

export default BarChart