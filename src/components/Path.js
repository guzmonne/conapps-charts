import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-shape'),
  require('d3-brush'),
  require('d3-selection')
)

class Path extends React.Component {

  line = (data) => {
    let line = d3.line()
                 .x(d => this.props.xScale(d[0]))
                 .y(d => this.props.yScale(d[1]))

    if (this.props.curve === true)
      line = line.curve(d3.curveCatmullRom.alpha(this.props.curveAlpha))
  
    return line(data)
  }

  render() {
    const {
      data,
      xScale,
      yScale,
      fill,
      stroke,
      strokeWidth,
      getContext,
      className
    } = this.props

    return (
      <g className={className} ref={c => getContext ? getContext(c, xScale) : null}>
        <path fill="transparent"
              stroke={stroke}
              strokeWidth={strokeWidth}
              d={this.line(data)}/>
      </g>
    )
  }
}

Path.propTypes = {
  className: T.string,
  data: T.arrayOf(T.array).isRequired,
  xScale: T.func.isRequired, // D3 Scale function
  yScale: T.func.isRequired, // D3 Scale function
  stroke: T.string,
  strokeWidth: T.number,
  brush: T.func, // D3 Brush
  brushed: T.func,
  getContext: T.func,
  curve: T.bool,
  curveAlpha: T.number,
}

Path.defaultProps = {
  className: 'Path',
  fill: 'transparent',
  stroke: '#5B5F97',
  strokeWidth: 1,
  curve: true,
  curveAlpha: 0.5,
}

export default Path
