const { Shape, Circle, Triangle, Square, Rectangle } = require('../shapes.js');

// Test suite
describe('shapes', () => {
  // testing if Shape.render() returns' ends in 'svg>'
  describe('logoShapeTest', () => {
    it('should return true if the returned string ends in svg>', () => {
      const newShape = new Shape()
      const endsWith = /svg>$/
      // console.log(newCircle.shapePath);
      expect(endsWith.test(newShape.render(
        'ABC',
        '#fff',
        'M 150,0 L 275,200 L 25,200 z',
        '#000'
        ))).toEqual(true)
    })
  })
  // testing that the circle class returns a path command containing 'M' & 'z'
  describe('logoCircleTest', () => {
    it('should return true if, it matches the regex expressions', () => {
      const newCircle = new Circle()
      // console.log(newCircle.shapePath);
      expect(newCircle.shapePath).toMatch(/^M/ && /z$/)
    })
  })
  // testing that the triangle class returns a path command containing 'M' & 'z'
  describe('logoTriangleTest', () => {
    it('should return true if, it matches the regex expressions', () => {
      const newTriangle = new Triangle()
      // console.log(newTriangle.shapePath);
      expect(newTriangle.shapePath).toMatch(/^M/ && /z$/)
    })
  })
  // testing that the square class returns a path command containing 'M' & 'z'
  describe('logoSquareTest', () => {
    it('should return true if, it matches the regex expressions', () => {
      const newSquare = new Square()
      // console.log(newSquare.shapePath);
      expect(newSquare.shapePath).toMatch(/^M/ && /z$/)
    })
  })
// testing that the rectangle class returns a path command containing 'M' & 'z'
  describe('logoRectangleTest', () => {
    it('should return true if, it matches the regex expressions', () => {
      const newRectangle = new Rectangle()
      // console.log(newRectangle.shapePath);
      expect(newRectangle.shapePath).toMatch(/^M/ && /z$/)
    })
  })
})