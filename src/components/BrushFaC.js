import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-brush')
)

class BrushFaC extends React.Component {
  
  brush = (width, height, brushed) => (
    d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on("brush", brushed)
  )
  
  render() {
    const {children} = this.props
    return (
      <g>
        <rect x="10" y="10" fill="black"></rect>
      {children({
        brush: this.brush
      })}  
      </g>
    )
  }
}

export default BrushFaC
