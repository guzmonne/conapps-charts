import '../_styles/BarChart.css'

import React, {PropTypes as T} from 'react'
import ChartFaC from './ChartFaC.js'
import TooltipFaC from './TooltipsFaC.js'
import Tooltip from './BarChartTooltip.js'

const BarChart = (props) => {
  const {data, fill, stroke, tooltips} = props
  return (
    <div className="BarChart">
      <TooltipFaC>
      {({tooltipShow, tooltipHide, tooltipState}) => (
        <ChartFaC className="BarChart__container" 
                  xAxis="band"
                  tooltip={tooltips ? <Tooltip {...tooltipState} /> : <none />}
                  {...props}>
          {({xScale, yScale, w, h}) => (
            <g className="Rects">
            {data.map((d, i) => (
              <g className="BarChart__bar"
                key={`rect[${i}]`}
                onMouseLeave={tooltipHide}
                onMouseMove={tooltipShow(d)}>
                <rect x={xScale(d[0])}
                      y={yScale(d[1])}
                      fill={fill}
                      stroke={stroke}
                      width={xScale.bandwidth()}
                      height={h - yScale(d[1])}
                />
              </g>
            ))}
            </g>
          )}</ChartFaC>
      )}</TooltipFaC> 
    </div>
  )
}


BarChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
  fill: T.string,
  stroke: T.string,
  tooltips: T.bool,
}

BarChart.defaultProps = {
  tooltips: true,
  fill: '#5B5F97',
}

export default BarChart