import React, {PropTypes as T} from 'react'

const BarChartTooltip = ({active, top, left, data, className}) => {
  if (!active) return <none />

  return (
    <div style={{left, top}}
          className={className}>
      <span><strong>{data && data[0]}</strong></span>
      <br/>
      <span>{data && data[1]}</span>
    </div>
  )
}

BarChartTooltip.propTypes = {
  active: T.bool,
  top: T.number,
  left: T.number,
  data: T.arrayOf(T.array),
  className: T.string,
}

BarChartTooltip.defaultProps = {
  className: 'BarChart__tooltip',
}

export default BarChartTooltip
