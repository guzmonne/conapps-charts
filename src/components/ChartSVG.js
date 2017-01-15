import React, {PropTypes as T} from 'react'

const d3 = Object.assign({},
  require('d3-selection'),
)

class ChartSVG extends React.Component { 
  targetWidth = () => {
    if (!this.container) return 0
    return parseInt(this.container.style('width'))
  }

  aspectHeight = (aspect) => {
    return Math.round(this.targetWidth() / aspect)
  }

  render() {
    const {
      className,
      width,
      height,
      margin,
      children,
    } = this.props

    return (
      <div className={className}
           id={this.id}
           ref={c => (this.container = d3.select(c))}>
        <svg width={this.targetWidth()} 
             height={this.aspectHeight(width / height)}
             viewBox={`0 0 ${width || 0} ${height || 0}`}
             ref={c => (this.svg = c)}
             preserveAspectRatio="xMinYMid">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {children}
          </g>
        </svg>
      </div>
    )
  }
}

ChartSVG.propTypes = {
  className: T.string,
  width: T.number.isRequired,
  height: T.number.isRequired,
  margin: T.shape({
    top: T.number,
    right: T.number,
    bottom: T.number,
    left: T.number,
  }),
}

ChartSVG.defaultProps = {
  className: 'ChartSVG',
  margin: {top: 30, right: 15, bottom: 80, left: 30},
  width: 600,
  height: 400,
}

export default ChartSVG
