import '../_styles/BarChart.css'

import React, {PropTypes as T} from 'react'
import ChartFaC from './ChartFaC.js'

class BarChart extends React.Component {
  state = {
    tooltipTop: 0,
    tooltipLeft: 0,
    tooltipData: undefined,
  }

  showTooltip = (data) => (e) => {
    const {nativeEvent: {offsetX, offsetY}} = e
    this.setState({
      tooltipTop: offsetY,
      tooltipLeft: offsetX,
      tooltipData: data,
    })
  }

  hideTooltip = () => {
    this.setState({
      tooltipKey: undefined,
      tooltipTop: 0,
      tooltipLeft: 0,
      tooltipData: undefined,
    })
  }

  render() {
    const {data, fill, stroke, tooltips} = this.props
    const {
      tooltipTop,
      tooltipLeft,
      tooltipData,
    } = this.state
    return (
      <div className="BarChart">
      {tooltips && tooltipData &&  
        <div style={{left: tooltipLeft + 10, top: tooltipTop -10}}
             className="BarChart__tooltip">
          <span><strong>{tooltipData[0]}</strong></span>
          <br/>
          <span>{tooltipData[1]}</span>
        </div>
      }
        <ChartFaC {...this.props}>
        {({xScale, yScale, w, h}) => (
          <g className="Rects">
          {data.map((d, i) => (
            <g className="BarChart__bar"
              onMouseLeave={this.hideTooltip}
              onMouseMove={this.showTooltip(d)}>
              <rect x={xScale(d[0])}
                    y={yScale(d[1])}
                    fill={fill}
                    stroke={stroke}
                    key={`rect[${i}]`}
                    width={xScale.bandwidth()}
                    height={h - yScale(d[1])}
              />
            </g>
          ))}
          </g>
        )}
        </ChartFaC>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: T.arrayOf(T.array).isRequired,
  fill: T.string,
  stroke: T.string,
  tooltips: T.bool,
}

BarChart.defaultProps = {
  tooltips: true,
}

export default BarChart