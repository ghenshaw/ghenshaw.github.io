var w = 960,h = 500,nodes = [];

    var svg = d3.select("body").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    var force = d3.layout.force()
        .charge(-300)
        .size([w, h])
        .nodes(nodes)
        .on("tick", tick)
        .start();

    function tick() {
        svg.selectAll("circle")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

    }

    var interval = setInterval(function () {
        var d = {
            x: w / 2 + 2 * Math.random()-1 ,
            y: h / 2 + 2 * Math.random() - 1
        };

        svg.append("svg:circle")
            .data([d])
            .attr("r", 10)
          .transition()
            .ease(Math.sqrt)
               .style("stroke", "gray")
     .style("fill", "red")
     .attr("r", 10);

        if (nodes.push(d) > 20) {
            clearInterval(interval);
            d3.selectAll('circle').on("mouseover", animate).on("mouseout", function () {
                d3.select(this).transition()
                    .duration(100)
            .attr("r", 40);
                d3.selectAll('circle').style("fill", "black");
            });
        }
        force.stop()
        force.start();
    }, 200);


    function animate() {
        d3.select(this).transition()
            .duration(300)
            .attr("r", 20);


        d3.select(this).style("fill", "green");
        var sel = d3.select(this);
        sel.moveToFront();
    };
    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };