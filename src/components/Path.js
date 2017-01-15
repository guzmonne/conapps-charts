import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-shape'),
  require('d3-brush'),
  require('d3-selection')
)

class Path extends React.Component {
  componentDidMount() {
    if (this.props.brush) {
      d3.select(this.context)
        .call(this.props.brush.on('brush', this.brushed))
        .call(this.props.brush.move, this.props.xScale.range());
    }
  }

  componentWillUnmount() {
    if (this.props.brush) {
      d3.select(this.context)
        .call(this.props.brush.on('brush', null))
    }
  }

  brushed = (d, i, [g]) => {
    const {xScale} = this.props   
    const selection = d3.brushSelection(g)
    return this.props.brushed(selection.map(xScale.invert))
  }

  line = d3.line()
           .x(d => this.props.xScale(d[0]))
           .y(d => this.props.yScale(d[1]))
           .curve(d3.curveCatmullRom.alpha(0.5))
 
  render() {
    const {data, xScale, yScale, fill, stroke, className} = this.props

    return (
      <g className={className} ref={c => this.context = c}>
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
  max: T.any,
  min: T.any,
}

Path.defaultProps = {
  className: 'Path',
  fill: 'transparent',
  stroke: '#5B5F97',
}

export default Path
