import React, {PropTypes as T} from 'react'

const Circles = ({data, xScale, yScale, radius, fill, fillOpacity, className, onMouseEnter, onMouseLeave}) => (
  <g className={className}>
    {data.map((d, i) => (
      <circle key={i}
              cx={xScale(d[0])} 
              cy={yScale(d[1])}
              r={radius}
              fill={fill}
              fillOpacity={fillOpacity}
              onMouseEnter={e => onMouseEnter(e, d)}
              onMouseLeave={e => onMouseLeave(e, d)}
      />
    ))}
  </g>
)

Circles.propTypes = {
  className: T.string,
  data: T.arrayOf(T.array).isRequired,
  xScale: T.func.isRequired, // D3 Scale function
  yScale: T.func.isRequired, // D3 Scale function
  fill: T.string,
  radius: T.number,
  onMouseEnter: T.func,
  onMouseLeave: T.func,
}

Circles.defaultProps = {
  className: 'Circles',
  fill: 'transparent',
  stroke: '#5B5F97',
  radius: 2,
  fillOpacity: 1,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
}

export default Circles
