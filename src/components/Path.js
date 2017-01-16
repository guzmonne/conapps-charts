import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-shape'),
  require('d3-brush'),
  require('d3-selection')
)

class Path extends React.Component {

  line = d3.line()
           .x(d => this.props.xScale(d[0]))
           .y(d => this.props.yScale(d[1]))
           .curve(d3.curveCatmullRom.alpha(0.5))
 
  render() {
    const {data, xScale, yScale, fill, stroke, getContext, className} = this.props

    return (
      <g className={className} ref={c => getContext ? getContext(c, xScale) : null}>
        <path fill="transparent"
              stroke={stroke}
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
  brush: T.func, // D3 Brush
  brushed: T.func,
  getContext: T.func,
}

Path.defaultProps = {
  className: 'Path',
  fill: 'transparent',
  stroke: '#5B5F97',
}

export default Path
