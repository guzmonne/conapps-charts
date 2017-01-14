import '../_styles/LineChart.css'

const d3 = Object.assign({},
  require('d3-shape')
)

import React, {PropTypes as T} from 'react'
import ChartFaC from './ChartFaC.js'
import TooltipFaC from './TooltipsFaC.js'
import Tooltip from './LineChartTooltip.js'

const LineChart = (props) => {  
  const {data, fill, stroke, tooltips} = props
  
  const linePoints = (data, xScale, yScale) => (
    d3.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(d3.curveCatmullRom.alpha(0.5))
      (data)
  )

  return (
    <div className="LineChart">
      <TooltipFaC>
      {({tooltipShow, tooltipHide, tooltipState}) => (
        <ChartFaC className="LineChart__container" 
                  xAxis="time"
                  tooltip={tooltips ? <Tooltip {...tooltipState} /> : <none />}
                  {...props}>
          {({xScale, yScale, w, h}) => (
            <g className="LineChart__path"> 
              <path d={linePoints(data, xScale, yScale)} 
                    fill="transparent"
                    stroke={stroke}
                    strokeWidth="2"/>
            {data.map((d, i) => (
              <g key={`Circles.${i}`}>
                <circle cx={xScale(d[0])} 
                        cy={yScale(d[1])}
                        r="2"
                        fill={fill}
                        fillOpacity="1"
                />
                <circle cx={xScale(d[0])} 
                        cy={yScale(d[1])}
                        r="10"
                        fill="transparent"
                        fillOpacity="1"
                        onMouseLeave={tooltipHide}
                        onMouseMove={tooltipShow(d)}
                />
              </g>
            ))}
            </g>
          )}</ChartFaC>
      )}</TooltipFaC>
    </div>
  )
}

LineChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }),
  fill: T.string,
  stroke: T.string,
  pointFill: T.string,
  tooltips: T.bool,
}

LineChart.defaultProps = {
  margin: {top: 30, right: 15, bottom: 40, left: 30},
  tooltips: true,
  stroke: '#5B5F97',
  fill: '#5B5F97',
  data: [],
}

export default LineChart