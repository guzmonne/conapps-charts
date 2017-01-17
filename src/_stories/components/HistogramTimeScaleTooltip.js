import '../_styles/Tooltip.css'

import React, {PropTypes as T} from 'react'
import isDate from 'lodash/isDate'

const addZero = (string) => (('0' + string).slice(-2))
const year = (date) => (date.getFullYear())
const month = (date) => (addZero((date.getMonth() + 1).toString()))
const day = (date) => (addZero((date.getDate()).toString()))
const hour = (date) => (addZero((date.getHours()).toString()))
const format = (date) => (
  `${year(date)}/${month(date)}/${day(date)}`
)

const TooltipTimeScale = ({active, top, left, data, className}) => {
  if (!active || !isDate(data[0])) return <none />

  return (
    <div style={{left, top}}
          className={className}>
      <span><strong>{data && format(data[0])}</strong></span>
      <br/>
      <span><strong>{data && format(data[2])}</strong></span>
      <br/>
      <span>{data && data[1]}</span>
    </div>
  )
}

TooltipTimeScale.propTypes = {
  active: T.bool,
  top: T.number,
  left: T.number,
  data: T.array,
  className: T.string,
}

TooltipTimeScale.defaultProps = {
  className: 'Tooltip',
}

export default TooltipTimeScale
