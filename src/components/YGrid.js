import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-axis')
)

class YGrid extends React.Component {
  componentDidUpdate() {
    d3.select(this.yGrid)
      .call(
        d3.axisLeft(this.props.scale)
          .ticks(5)
          .tickSize(-this.props.width)          
          .tickFormat('')
      )
  }
  
  render() {
    return (
      <g className="xGrid" ref={c => (this.yGrid = c)}/>
    )
  }
}

YGrid.propTypes = {
  width: T.number.isRequired,
  scale: T.func.isRequired,
}

export default YGrid
