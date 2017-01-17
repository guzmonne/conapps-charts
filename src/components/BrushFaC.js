import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-brush'),
  require('d3-selection')
)

class BrushFaC extends React.Component {
  componentDidMount() {
    this.mountBrush()
  }

  componentWillUnmount() {
    this.unmountBrush()
  }
  
  brush = d3.brushX()
          .extent([
            [0, 0],
            [this.props.width, this.props.height - this.props.margin.bottom - this.props.margin.top]]
          )
  
  mountBrush = () => {
    d3.select(this.context)
      .call(this.brush.on('brush', this.brushed))
      .call(this.brush.move, this.props.scale.range())
  } 
  
  unmountBrush = () => {
    d3.select(this.context)
      .call(this.brush.on('brush', null))
  }

  brushed = (d, i, [g]) => {
    if (!this.props.scale || !this.props.scale.invert) return
    const result = d3.brushSelection(g).map(this.props.scale.invert)
    return this.props.brushed(result)
  }

  setBrushContext = (context) => {
    if (!context) return
    this.context = context
  }

  render() {
    const {children} = this.props
    return children({
      setBrushContext: this.setBrushContext,
    })
  }
}

BrushFaC.propTypes = {
  width: T.number,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }).isRequired,
  scale: T.func.isRequired,   // D3 Scale 
  brushed: T.func.isRequired, // Callback function
}

export default BrushFaC
