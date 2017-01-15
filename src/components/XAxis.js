import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-axis')
)

class XAxis extends React.Component {
  componentWillReceiveProps(props) {
    if (props.ticks !== this.props.ticks) {
      this.drawAxis(props)
    }
  }

  componentDidUpdate() {
    this.drawAxis(this.props)
  }

  drawAxis = (props) => (
    d3.select(this.xAxis)
      .attr('transform', `translate(0, ${props.height})`)
      .call(
        d3.axisBottom(props.scale)
          .ticks(props.ticks)
      )
  )
  
  render() {
    const {className} = this.props

    return (
      <g className={className}
         ref={c => (this.xAxis = c)}
      />)
  }
}

XAxis.propTypes = {
  height: T.number.isRequired,
  scale: T.func.isRequired, // D3 scale
  className: T.string,
  ticks: T.number,
}

XAxis.defaultProps = {
  className: 'xAxis',
  ticks: 5,
}

export default XAxis
