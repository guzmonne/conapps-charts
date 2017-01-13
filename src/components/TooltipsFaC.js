import React, {PropTypes as T} from 'react'

class TooltipFaC extends React.Component {
  state = {
    top: 0,
    left: 0,
    data: undefined,
    active: false,
  }

  tooltipShow = (data) => (e) => {
    const {nativeEvent: {offsetX, offsetY}} = e
    this.setState({
      top: offsetY - 10,
      left: offsetX + 10,
      data: data,
      active: true,
    })
  }

  tooltipHide = () => {
    this.setState({
      top: 0,
      left: 0,
      data: undefined,
      active: false,
    })
  }

  render() {
    return (this.props.children({
      tooltipShow: this.tooltipShow,
      tooltipHide: this.tooltipHide,
      tooltipState: this.state,
    }))
  }
}

TooltipFaC.propTypes = {
  children: T.func.isRequired,
  className: T.string,
  show: T.bool,
}

TooltipFaC.defaultProps = {
  className: 'ConappsCharts__tooltip'
}

export default TooltipFaC
