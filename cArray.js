 
  const BLANK = -1;
  const EMPTY = 0;
  const SORTED = 1;
  const NOT_SORTED = 2;

class cArray {
    constructor(size, x, y){
      this.size = size
      this.cell_width = 100;
      this.cell_height = 100;
      this.array_data = []
      this.x = x - (size * this.cell_width) / 2
      this.y = y - (this.cell_height / 2)
      this.z = -2
      this.color = "gainsboro"
      this.makeGrid()
    }

    
  
    delete() {
      if (this.ele) 
      {
        this.ele.remove();
      }
    }
  
    makeGrid() {
      
      var xpos = this.x
      for (var column = 0; column < this.size; column++) {
          this.array_data.push({
              x: xpos,
              y: this.y,
              width: this.cell_width,
              height: this.cell_height,
              index: column,
              color: "gainsboro"
          })
          // increment the x position. I.e. move it over by 50 (width variable)
          xpos += this.cell_width + this.cell_width/20;
      }
  
    }

    setColor(color, index) {
        
        if (this.ele){ 
            //this.ele.selectAll(".arraycell").style("fill", "gainsboro")
            //console.log(this.ele.selectAll(".arraycell").filter(d => d.index === index))
            this.ele.selectAll(".arraycell").filter(d => d.index === index).style("fill", color)
          
            
            this.array_data[index].color = color
        }
    }

    checkValidity() {
        var obj = { valid: true, cells: [] }
        //get all cells holding data and order by index
        var temp = this.array_data.filter(d => d.holding_node).sort((a, b) => a.index - b.index) 
        var data = this.array_data;

        
        
        var res = [];
        var prev = this.array_data.find(d => d.holding_node) //data[0].holding_node.value == undefined ? -999999 : data[0].holding_node.value
        
        if (prev == undefined) 
        { 
            data.forEach(function(d) { res.push(BLANK) }); 
            return res;
        }
        
        for (var i = 0; i < prev.index; i++) 
        {
            res.push(NOT_SORTED);
        }
        var sorted = true;
        for(var i = prev.index; i < data.length; i++) {
            var curr = data[i];
            if(curr.holding_node == undefined){
                res.push(EMPTY);
                continue;
            }
            
            if(curr.holding_node.value < prev.holding_node.value){ 
                res.push(NOT_SORTED);
                sorted = false
                prev = curr;
            }
            else if (sorted) {
                res.push(SORTED);
                prev = curr;
            } 
            else 
            {
                res.push(NOT_SORTED);
                prev = curr;
            }
            
        }

        for (var i = prev.index + 1; i < data.length; i++) 
        {
            res[i] = BLANK;
        }

        return res;
    }

    draw() {
      if (this.ele) { this.ele.remove(); }
      this.ele = svg.append("g")
      var temp = this; //need to do this to use "this" in mouseout

      this.ele
        .append("text")
        .attr("class", "arraytext")
        .attr("dx", this.x + (this.size * this.cell_width) / 2)
        .attr("dy", this.y + 125)
        .text("Sorted Array") 
        .attr('font-size',18)//font size
        .attr('font-family',"monaco")//font size
        .style("text-anchor", "middle")
        .attr("pointer-events", "none")

      this.ele
        .selectAll(".arraycell")
        .data(this.array_data)
        .join("rect")
          .attr("class","arraycell")
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
        .attr("rx", 25)
        .attr("ry", 25)
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) {return d.color })
          //.style("stroke", "darkslategray")
          .style("opacity", 0.4)
          .style("stroke-width", 5)
          .on("mouseover", function(d) {
            // if dragging node and cell not holding node, then attach it to array cell
            
            if (dragged_node && !d.holding_node) {
              d.holding_node = dragged_node;
              dragged_node.locked_to_grid = true;
              dragged_node.fx = d.x + d.width/2 ;
              dragged_node.fy = d.height/2 + temp.y;
              dragged_node_array_cell = d;
              // now check if array is valid and color it accordingly
              var res = temp.checkValidity()
              //this.ele.selectAll(".arraycell").style("fill", "gainsboro")
              res.forEach(function(d, i) {
                  if (d === BLANK) temp.setColor("gainsboro", i)
                  if (d === EMPTY) temp.setColor("#e9b000", i)
                  if (d === SORTED) temp.setColor("green", i)
                  if (d === NOT_SORTED) temp.setColor("#E24e42", i)
              })
            }
          })
          .on("mouseout", function(d) {
            // if dragging node out of cell, then detach it
            if (dragged_node) {
              //console.log(d.holding_node)
              if (d.holding_node === dragged_node) {
                //console.log("releasing node from cell")
                d.holding_node = undefined;
                // check if array is valid
                var res = temp.checkValidity()
                res.forEach(function(d, i) {
                    if (d === BLANK) temp.setColor("gainsboro", i)
                    if (d === EMPTY) temp.setColor("#e9b000", i)
                    if (d === SORTED) temp.setColor("green", i)
                    if (d === NOT_SORTED) temp.setColor("#E24e42", i)
                })
              }
              else {
                // occupied array cell
               // console.log("occupied cell");
              }
              dragged_node.locked_to_grid = false;
              dragged_node_array_cell = undefined;
            }
          })
    }
  }
