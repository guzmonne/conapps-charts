//import '../_styles/LineChart.css'

import React, {PropTypes as T} from 'react'
import ChartFaC from './ChartFaC.js'
import TooltipFaC from './TooltipsFaC.js'
//import Tooltip from './LineChartTooltip.js'

const LineChart = (props) => {
  const {data, fill, stroke, tooltips} = props
  return (
    <div className="LineChart">
      <TooltipFaC>
      {({tooltipShow, tooltipHide, tooltipState}) => (
        <ChartFaC className="LineChart__container" 
                  tooltip={tooltips ? <Tooltip {...tooltipState} /> : <none />}
                  {...props}>
          {({xScale, yScale, w, h}) => (
            
          )}</ChartFaC>
      )}</TooltipFaC> 
    </div>
  )
}


LineChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
  fill: T.string,
  stroke: T.string,
  tooltips: T.bool,
}

LineChart.defaultProps = {
  tooltips: true,
}

export default LineChart