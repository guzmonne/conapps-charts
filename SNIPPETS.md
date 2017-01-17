SNIPPETS
===

Events
---

Add divs working as tooltips upon hovering over a circle.

```css
div.tooltip {
  position: absolute;
  text-align: center;
  width: 60px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
```

```javascript
var data = [] /* some data */
// Define the svg
var svg = d3.select("body").append("svg")
// Define the div
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
// add the dots with tooltips
svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.date); })
    .attr("cy", function(d) { return y(d.close); })
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(formatTime(d.date) + "<br/>" + d.close)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
      });
```

Cool Links
---

- [Stacked-to-Grouped Bars](http://bl.ocks.org/mbostock/3943967)
- [Universe by Crossfilter](https://github.com/crossfilter/universe)
- [World Bank Crossfilter example](http://drarmstr.github.io/c3/examples/#worldbank/)
- [DC.js](https://dc-js.github.io/dc.js/)
- [Trend Chart (Area + Line)](http://bl.ocks.org/rkirsling/33a9e350516da54a5d4f)
- [Visavail.js - A Time Data Availability Chart](https://github.com/flrs/visavail)
- [Spotify Artist Explorer](https://artistexplorer.spotify.com/)
- [D3js Layout Scaling](https://gist.github.com/plandem/5683951s)
- [Longscroll.js](http://bl.ocks.org/jasondavies/3689677)
- [Chartio](https://chartio.com/signup/)