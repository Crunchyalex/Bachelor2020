
class Circle {
    constructor(value, x, y){
      this.value = value;
      this.radius = 100;
      this.visible = false;
      this.x = x;
      this.y = y;
      this.ele = null;
      this.z = 0
    }
    delete() {
      if (this.ele) 
      {
        this.ele.remove();
      }
    }
  
    draw() {
      if (this.ele) 
      {
        this.ele.remove();
      }
      this.ele = svg.append("g").datum(this)
      
      this.ele
        .append("circle")
        .attr("r", defaultRadius)
        .attr("fill", myColor(this.value))
        .call(d3.drag()
        .on("drag", dragged)
        .on("end", dragended))
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", onNodeClick)
      
      if (this.visible) {
        this.ele.append("text")
            .attr("class", "circletext")
          .attr("dx", d => 0)
          .attr("dy", d => defaultRadius/6)
          .text(function(d){return d.value}) 
          .style("text-anchor", "middle")
          .attr("pointer-events", "none")
          .attr('font-size', defaultRadius / 1.5)//font size
          .attr('font-family',"monaco")//font size
      }
    }
  }