import React, {PropTypes as T} from 'react'
import {INTERVALS} from './variables.js'

const d3 = Object.assign({},
  require('d3-brush'),
  require('d3-array'),
  require('d3-time'),
  require('d3-scale'),
  require('d3-random'),
  require('d3-selection')
)

class HistogramFaC extends React.Component {
  interval = () => {
    const {thresholds, xTicks, xAxis} = this.props
    if (xAxis === 'time') {
      if (INTERVALS.indexOf(thresholds) === -1) return d3.timeDay
      return d3[thresholds]
    }
    return xTicks
  }

  getXScale = () => {
    const {data, xAxis, width} = this.props
    switch(xAxis) {
      case 'time':
        return d3.scaleTime()
                 .domain([
                   d3.min(data, d => d[0]),
                   d3.max(data, d => d[0])
                 ])
                 .rangeRound([0, width])
      case 'linear':
        return d3.scaleLinear()
                 .rangeRound([0, width])
      default:
    }
  }

  getYScale = () => {
    const {height} = this.props
    return d3.scaleLinear()
             .range([height, 0])
  }

  render() {
    const {data, children} = this.props

    const xScale = this.getXScale()
    const yScale = this.getYScale()

    const histogram = d3.histogram()
                      .domain(xScale.domain())
                      .value(d => d[0])
                      .thresholds(xScale.ticks(this.interval()))

    const bins = histogram(data)

    yScale.domain([0, d3.max(bins, d => d.length)])

    return children({
      bins,
      xScale,
      yScale,
    })
  }
}

HistogramFaC.propTypes = {
  data: T.array.isRequired,
  width: T.number.isRequired,
  height: T.number.isRequired,
  xAxis: T.string,
  thresholds: T.string, // D3-Time interval
}

HistogramFaC.defaultProps = {
  xAxis: 'linear',
  thresholds: 'timeDay',
}

export default HistogramFaC
