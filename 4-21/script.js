var margin = {top: 20, right: 50, bottom: 100, left: 100};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top -margin.bottom;



var slider = document.getElementById("myRange");
var slider_value = 0;

slider.oninput = function() {
  slider_value = this.value;
}



var svg = d3.select("#chart-area").append("svg")
            .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
           .attr("transform","translate("+margin.left+","+margin.top+")")
           .attr("id","chart");

var ylabel = g.append("text")
     .attr("class","y-label")
     .attr("text-anchor","middle")
     .attr("x","-50")
     .attr("y",height/2)
     .text("User Comment karma (Log)");



var xlabel = g.append("text")
     .attr("class","x-label")
     .attr("text-anchor","left")
     .attr("x",width/2)
     .attr("y",height + 50)
     .text("User Post karma (Log)");




d3.csv("data_reversed.csv").then(function(data){

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


    var leftaxis = d3.axisLeft(yscale);
    var bottomaxis = d3.axisBottom(xscale);

    g.append("g")
     .call(leftaxis);

    g.append("g")
     .attr("transform","translate(0,"+height+")")
     .attr("fill","white")
     .call(bottomaxis);

	
     d3.interval(function(){
     	update(data,xscale,yscale);
     },100);

     update(data,xscale,yscale);
	

}).catch(function(error){
	console.log(error)
});

function update(data,xscale,yscale){

	data2 = data.slice(1,slider_value);

	circles = g.selectAll("circle")
	 .data(data2);

	 circles.enter()
	 .append("circle")
	 .attr("cx",function(d){
	 	 if (isNaN(d.post_karma)){
	 		x = 1;
	 	}else{
	 		x = Math.max(d.post_karma,1);
	 	}
	 	return xscale(x);
	 })
	 .attr("cy",function(d){
        if (isNaN(d.comment_karma)){
	 		y = 1;
	 	}else{
	 		y = Math.max(d.comment_karma,1);
	 	}
	 	return yscale(y);
	 })
	 .attr("r",function(d){
	 	if (isNaN(d.score)){
	 		score = 1;
	 	}else{
	 		score = Math.max(d.score,1);
	 	}
	 	return Math.sqrt((score)/5);
	 })
	 .attr("fill",function(d){
	 	if (d.is_original_post == "True"){
	 		return "red";
	 	} else {
	 		return "blue";
	 	};
	 })
	 .attr("fill-opacity",".3");

	 circles.exit().remove();


	 circles.enter()
	 .append("circle")
	 .attr("cx",function(d){
	 	 if (isNaN(d.post_karma)){
	 		x = 1;
	 	}else{
	 		x = Math.max(d.post_karma,1);
	 	}
	 	return xscale(x);
	 })
	 .attr("cy",function(d){
        if (isNaN(d.comment_karma)){
	 		y = 1;
	 	}else{
	 		y = Math.max(d.comment_karma,1);
	 	}
	 	return yscale(y);
	 })
	 .attr("r",function(d){
	 	if (isNaN(d.score)){
	 		score = 1;
	 	}else{
	 		score = Math.max(d.score,1);
	 	}
	 	return Math.sqrt((score)/5);
	 })
	 .attr("fill",function(d){
	 	if (d.is_original_post == "True"){
	 		return "red";
	 	} else {
	 		return "blue";
	 	};
	 })
	 .attr("fill-opacity",".3");



}



