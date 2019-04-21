
data = [246, 245, 241, 240.5]
times_raw = ["Aug-3", "Aug-4", "Aug-5", "Aug-6"]
format = d3.time.format("%b-%d")
times = (format.parse(t) for t in times_raw)

chart_width=640
chart_height=240
chart_axis_margin=20

x = d3.time.scale()
    .domain(times)
    .range([ 0 + chart_axis_margin, chart_width - chart_axis_margin ])

y = d3.scale.linear()
	.domain([ 200, 255 ])
	.range([ 0 + chart_axis_margin, chart_height - chart_axis_margin ])


vis = d3.select(".content")
    .append("svg:svg")
        .attr("class", "chart")
        .attr("width", chart_width)
        .attr("height", chart_height)

g = vis.append("svg:g")
    .attr("transform", 'translate(0,'+chart_height+')') #flip the graph over the yaxis


g.selectAll("scatter-dots")
  .data(data)
  .enter().append("svg:circle")
      .attr("cy", (d)   -> flipy(y(d))  )
      .attr("cx", (d,i) -> x(i) )
      .attr("r", 2)
      .style("opacity", 0.6)