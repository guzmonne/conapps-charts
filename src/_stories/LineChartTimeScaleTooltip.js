import React, {PropTypes as T} from 'react'

const addZero = (string) => (('0' + string).slice(-2))
const year = (date) => (date.getFullYear())
const month = (date) => (addZero((date.getMonth() + 1).toString()))
const day = (date) => (addZero((date.getDate()).toString()))
const hour = (date) => (addZero((date.getHours()).toString()))
const format = (date) => (
  `${year(date)}/${month(date)}/${day(date)}`
)

const LineChartTimeScaleTooltip = ({active, top, left, data, className}) => {
  if (!active) return <none />

  return (
    <div style={{left, top}}
          className={className}>
      <span><strong>{data && format(data[0])}</strong></span>
      <br/>
      <span>{data && data[1]}</span>
    </div>
  )
}

LineChartTimeScaleTooltip.propTypes = {
  active: T.bool,
  top: T.number,
  left: T.number,
  data: T.array,
  className: T.string,
}

LineChartTimeScaleTooltip.defaultProps = {
  className: 'LineChart__tooltip',
}

export default LineChartTimeScaleTooltip