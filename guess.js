//floats

function precise(x) {
  return Number.parseFloat(x).toPrecision(3);
}

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

//Correlation
function pearsonCorrelation(prefs, p1, p2) {
  var si = [];

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }
  var n = si.length;
  if (n == 0) return 0;
  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];
  var sum2 = 0;
  for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];
  var sum1Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  }
  var sum2Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  }
  var pSum = 0;
  for (var i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  }
  var num = pSum - (sum1 * sum2 / n);
  var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
      (sum2Sq - Math.pow(sum2, 2) / n));
  if (den == 0) return 0;
  return num / den;
}

var width = 500;
var height = 500;
var padding = 50;

//for (var i=0; i<size; i++){
//	cords.push([x_cord[i],600 - y_cord[i]]);
//}

//var corr = pearsonCorrelation([x_cord,y_cord],0,1);


var xscale = d3.scale.linear()
               .domain([0,100])
               .range([padding,width-padding]);
var yscale = d3.scale.linear()
               .domain([0,100])
               .range([height-padding,padding]);
var xAxis = d3.svg.axis()
                  .scale(xscale)
                   .orient("bottom");
var yAxis = d3.svg.axis()
                  .scale(yscale)
                  .orient("left");

d3.select("body")
    .select("div.graph")
    .append("svg")
    .attr("height",height)
    .attr("width",width)
    .append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+(height-padding)+")")
    .call(xAxis); 

d3.select("body")
    .select("div.graph")
    .select("svg")
    .append("g")
    .attr("class","axis")
    .attr("transform","translate("+padding+",0)")
    .call(yAxis);

var intercept = Math.random()*100;

var slope = (-yscale(intercept)+yscale(50))/(xscale(50)-xscale(0));

//var svg = d3.select("svg")
//    .append("line")
//    .attr("x1",xscale(0))
//    .attr("y1",yscale(intercept))
//    .attr("x2",xscale(100))
//    .attr("y2",yscale(intercept) + slope*xscale(100))
//    .attr("stroke", "black");

var x_cords = []; 
var y_cords = [];
var data = [];
var delta = [];
var cords = [];
var size = Math.round(Math.random()*50);

for (var i=0; i<size; i++){
    x_cords.push(xscale(Math.random()*70+20));
}
for (var i=0; i<size; i++){
    y_cords.push(yscale(intercept)+slope*x_cords[i]);
}
for (var i=0; i<size; i++){
	delta.push(randn_bm()*40 -20);
}
for (var i=0; i<size; i++){
	data.push([x_cords[i]+delta[i],y_cords[i]+delta[i]]);
}

var svg = d3.select("svg")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function(d){
    	return d[0];
    })
    .attr("cy",function(d){
    	return d[1];
    })
    .attr("r",5)
    .attr("fill","Salmon")
    .attr("opacity",.5)
    .attr("stroke","black");
var x = [];
var y = [];

for (var i=0; i<20; i++){
	x.push(x_cords[i]+delta[i]);
	y.push(y_cords[i]+delta[i]);
}

var corr = -pearsonCorrelation([x,y],0,1);

d3.select("body")
    .select("div")
    .select("div.answer")
    .append("p")
    .text("R = "+precise(corr));

