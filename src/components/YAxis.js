import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-axis')
)

class YAxis extends React.Component {
  componentWillReceiveProps(props) {
    if (props.ticks !== this.props.ticks) {
      this.drawAxis(props)
    }
  }

  componentDidUpdate() {
    this.drawAxis(this.props)
  }

  drawAxis = (props) => (
    d3.select(this.yAxis)
      .call(
        d3.axisLeft(props.scale)
          .ticks(props.ticks)
      )
  )
  
  render() {
    const {className} = this.props

    return (
      <g className={className}
         ref={c => (this.yAxis = c)}
      />)
  }
}

YAxis.propTypes = {
  scale: T.func.isRequired, // D3 scale
  className: T.string,
  ticks: T.number,
}

YAxis.defaultProps = {
  className: 'yAxis',
  ticks: 5,
}

export default YAxis
