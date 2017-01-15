import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-axis')
)

class XGrid extends React.Component {
  componentDidUpdate() {
    d3.select(this.xGrid)
      .attr('transform', `translate(0, ${this.props.height})`)
      .call(
        d3.axisBottom(this.props.scale)
          .ticks(5)
          .tickSize(-this.props.height)
          .tickFormat('')
      )
  }
  
  render() {
    return (
      <g className="xGrid" ref={c => (this.xGrid = c)}/>
    )
  }
}

XGrid.propTypes = {
  height: T.number.isRequired,
  scale: T.func.isRequired,
}

export default XGrid
