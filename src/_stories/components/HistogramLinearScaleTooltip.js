import '../_styles/Tooltip.css'

import React, {PropTypes as T} from 'react'

const HistogramLinearScaleTooltip = ({active, top, left, data, className}) => {
  if (!active) return <none />

  return (
    <div style={{left, top}}
          className={className}>
      <span><strong>{((Math.floor(data[0] * 100) / 100) + '0').slice(0, 4)}</strong></span>
      <br/>
      <span><strong>{((Math.floor(data[2] * 100) / 100) + '0').slice(0, 4)}</strong></span>
      <br/>
      <span>{data && data[1]}</span>
    </div>
  )
}

HistogramLinearScaleTooltip.propTypes = {
  active: T.bool,
  top: T.number,
  left: T.number,
  data: T.array,
  className: T.string,
}

HistogramLinearScaleTooltip.defaultProps = {
  className: 'Tooltip',
}

export default HistogramLinearScaleTooltip
