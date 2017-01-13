const T = React.PropTypes

const GREY = '#B8B8D1'
const BLUE = '#5B5F97'
const YELLOW = '#FFDC42'
const WHITE = '#FFFFFB'
const GREEN = '#5FBF74'
const RED = '#FF4747'

const HEXA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'F']

const randomMac = () => (
	_.chunk(_.range(12).map(i => chance.pickone(HEXA)), 2)
	.join(':')
	.replace(/,/g, '')
	.toLowerCase()
)

/**
 * @component App
 * @description Main application component
 */
class App extends React.Component {
  constructor(){
    super()
    //--
    this.randomPoints = this.randomPoints.bind(this)
    //--
    this.state = {
      margin: {top: 30, right: 15, bottom: 80, left: 30},
      maxRadius: 50,
      width: 600,
      height: 400,
      ticks: 10,
      yTicks: 20,
      xAxis: 'band',
      yAxis: 'linear',
      stroke: GREY,
      fill: BLUE,
      maxColor: RED,
      medColor: YELLOW,
      minColor: GREEN,
      data: [],
    }
  }
  
  componentDidMount() {
    this.randomPoints()
  }
  
  randomPoints() {
    this.setState(state => {
      let AP = []
      for (let i = 0; i < chance.d4()*5; i++){
        AP.push({
          Mac: randomMac(),
          Name: chance.name(),
          LocationID: chance.guid(),
          LocationName: chance.address(),
          Tags: _.range(chance.d4()).map(x => chance.word())
        })
      }
      const numberOfPoints = chance.d100() * 10
      let data = []
      for (let i = 0; i < numberOfPoints; i++){
        const ap = chance.pickone(AP)
        data.push({
          ID: chance.guid(),
          Timestamp: moment()
                    .hour(chance.hour())
                    .subtract(chance.d30(), 'days')
                    .valueOf(),
          Provider: chance.pickone(['facebook', 'google', 'local']),
          Gender: chance.pickone(['male', 'female']),
          ClientMac: randomMac(),
          NodeMac: ap.Mac,
          NodeName: ap.Name,
          LocationID: ap.LocationID,
          LocationName: ap.LocationName,
          Tags: ap.Tags,
        })
      }
      return {numberOfPoints, data}
    })
  }
  
  reduceData(data) {
    const result = Lazy(data).countBy(d => d.NodeName).toArray()
    return result
  }
  
  render() { 
    const {data, ...rest} = this.state
    return (
      <div className="App">
        <button onClick={this.randomPoints}>Randomize!</button>
        <Chart {...rest} data={this.reduceData(data)}/>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }
}




// Render
ReactDOM.render(<App/>, document.getElementById('root'))