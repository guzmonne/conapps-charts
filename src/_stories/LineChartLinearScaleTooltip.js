import React, {PropTypes as T} from 'react'

const LineChartTimeLinearTooltip = ({active, top, left, data, className}) => {
  if (!active) return <none />

  return (
    <div style={{left, top}}
          className={className}>
      <span><strong>{data[0]}</strong></span>
      <br/>
      <span>{data && data[1]}</span>
    </div>
  )
}

LineChartTimeLinearTooltip.propTypes = {
  active: T.bool,
  top: T.number,
  left: T.number,
  data: T.array,
  className: T.string,
}

LineChartTimeLinearTooltip.defaultProps = {
  className: 'LineChart__tooltip',
}

export default LineChartTimeLinearTooltip
