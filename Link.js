
  class Link {
    constructor(source, target){
      this.source = source
      this.target = target
      this.stroke_width = 10;
      this.z = -1
    }
  
    delete() {
      if (this.ele) 
      {
        this.ele.remove();
      }
    }
  
    draw() {
      if (this.ele) { this.ele.remove(); }
      this.ele = svg.append("g")
      var temp = this; // have to do this to access "this" in mouseover
  
      this.ele
        .append("line")
        .datum(this)
          .attr("stroke", "#999")
          .attr("stroke-width", temp.stroke_width)
          .attr("stroke-opacity", 0.6)
          .on("mouseover", function(d) {
            const l = d3.select(this);
            l.attr("stroke-width", temp.stroke_width * 2)
          })
          .on("mouseout", function(d) {
            const l = d3.select(this);
            l.attr("stroke-width", temp.stroke_width)
          })
          .on("click", function(d) {
            var index = list.indexOf(d);
    
            if (index !== -1) list.splice(index, 1);
            temp.delete();
            repaint();
            
          })
    }
  }