import React from 'react'
import ChartFaC from './ChartFaC.js'

const BarChart = (props) => {
  const {data, fill, stroke} = props
  return (
    <ChartFaC {...props}>
    {({xScale, yScale, w, h}) => (
      <g className="Rects">
      {data.map((d, i) => (
        <rect x={xScale(d[0])}
              y={yScale(d[1])}
              fill={fill}
              stroke={stroke}
              key={i}
              width={xScale.bandwidth()}
              height={h - yScale(d[1])}
        />
      ))}
      </g>
    )}
    </ChartFaC>
  )
}

export default BarChart