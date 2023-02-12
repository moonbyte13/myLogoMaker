class Shape {
  render(text, textColor, shapePath, shapeColor) {
    return `
<svg width='300' height='200' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'>
  <path fill="${shapeColor}" d="${shapePath}"/>
    <text x="50%" y="50%" style="font-size: 36px;" fill="${textColor}" text-anchor="middle" alignment-baseline="middle" font-family="Arial">
    ${text}
    </text>
</svg>`
  }
}

class Circle {
  constructor(){
    this.shapePath = "M 150,100 m -100,0 a 100,100 0 1,0 200,0 a 100,100 0 1,0 -200,0 z";
    return this.shapePath;
  }
}

class Triangle {
  constructor(){
    this.shapePath = "M 150,0 L 50,200 L 250,200 z";
    return this.shapePath;
  }
}

class Square {
  constructor(){
    this.shapePath = "M 50,0 h 200 v 200 h -200 z";
    return this.shapePath;
  }
}

class Rectangle {
  constructor(){
    this.shapePath = "M 0,0 h 300 v 200 h -300 z"
    return this.shapePath;
  }
}

module.exports = { Shape, Circle, Triangle, Square, Rectangle }