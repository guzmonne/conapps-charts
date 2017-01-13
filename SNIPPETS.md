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