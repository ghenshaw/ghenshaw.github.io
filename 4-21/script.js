var margin = {top: 20, right: 50, bottom: 100, left: 100};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top -margin.bottom;

var g = d3.select("#chart-area").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform","translate("+margin.left+","+margin.top+")");




d3.csv("data.csv").then(function(data){

	//clean data
	data.forEach(function(data){
		data.post_karma = +data.post_karma;
		data.comment_karma = +data.comment_karma;
		data.score = +data.score;
	})

	var max_post_karma = d3.max(data,function(d){
		return d.post_karma;
	});


	var max_comment_karma = d3.max(data,function(d){
		return d.comment_karma;
	});

	var xscale = d3.scaleLog()
               .domain([1,max_post_karma])
               .range([0,width]);

	var yscale = d3.scaleLog()
	           .domain([1,max_comment_karma])
	           .range([height,0]);

	console.log(xscale(2000));



    var leftaxis = d3.axisLeft(yscale);
    var bottomaxis = d3.axisBottom(xscale);

    g.append("g")
     .call(leftaxis);

    g.append("g")
     .attr("transform","translate(0,"+height+")")
     .call(bottomaxis);

	g.selectAll("circle")
	 .data(data)
	 .enter()
	 .append("circle")
	 .attr("cx",function(d){
	 	return xscale(d.post_karma);
	 })
	 .attr("cy",function(d){
	 	return yscale(d.comment_karma);
	 })
	 .attr("r",function(d){
	 	return Math.sqrt(d.score/5);
	 })
	 .attr("fill",function(d){
	 	if (d.is_original_post == "True"){
	 		return "red";
	 	} else {
	 		return "blue";
	 	};
	 })
	 .attr("fill-opacity",".3");

	 console.log(data);

	

}).catch(function(error){
	console.log(error)
})