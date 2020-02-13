class cText {
    constructor(text, x, y) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.z = 1
    }

    delete() {
        if (this.ele) 
        {
            this.ele.remove();
        }
    }
  
    draw() {
      if (this.ele) this.ele.remove()
  
      this.ele = svg.append("g")
      var temp = this; //need to do this to use this in mouseout
      this.text_ele = this.ele
        .append("text")
        .datum(this)
        .attr("class", "textnode")
        .text(this.text)
      this.text_ele 
        .attr("pointer-events", "none")
        .attr('font-size',18)//font size
        .attr('font-family',"monaco")//font size
        .attr('dx', -5)//positions text towards the left of the center of the circle
        .attr('dy',4)
    }
    
    setText(text){
      this.text_ele.text(text)
    }
  }