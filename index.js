const inquirer = require('inquirer')
const fs = require('fs')
const { Shape, Circle, Triangle, Square, Rectangle } = require('./lib/shapes.js');


const hexRegex = /^([a-fA-F0-9]{6}||[a-fA-F0-9]{3})$/
const svgColorKeywordRegex = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/;


const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to 3 Characters:'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a text color:'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'What shape would you like?',
    choices: [
      'Circle',
      'Square',
      'Rectangle',
      'Triangle'
    ]
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a shape color:'
  }
]

function createSVG(data) {
  process.chdir('examples');
  fs.writeFile('logo.svg', data, () => console.log('Generated logo.svg'));
}


inquirer
.prompt(questions)
.then((answers) => {
  if((answers.text.length <= 3 && answers.text.length !== 0)){

    if(
      (hexRegex.test(answers.textColor) ||
      svgColorKeywordRegex.test(answers.textColor.toLowerCase())) && 
      (hexRegex.test(answers.shapeColor) ||
      svgColorKeywordRegex.test(answers.shapeColor.toLowerCase()))
    ){
      if(hexRegex.test(answers.textColor)) {
        answers.textColor = `#${answers.textColor}`
      }
      if(hexRegex.test(answers.shapeColor)) {
        answers.shapeColor = `#${answers.shapeColor}`
      }
      
      let newSVG

      if(answers.shape === 'Square'){
        newSVG = new Square()
      }
      if(answers.shape === 'Triangle'){
        newSVG = new Triangle()
      }
      if(answers.shape === 'Circle'){
        newSVG = new Circle()
      }
      if(answers.shape === 'Rectangle'){
        newSVG = new Rectangle()
      }

      const shape = new Shape()
      const renderReturn = shape.render(
        answers.text,
        answers.textColor.toLowerCase(),
        newSVG.shapePath,
        answers.shapeColor.toLowerCase()
      )
      // console.log(renderReturn);
      createSVG(renderReturn)
      // console.log(answers);
      module.exports = answers
    }else{
      console.error('Please Enter at a valid hex code or color keyword.');
    }
  }else{
    console.error('Please Enter at least 1 character and no more than 3 characters.');
  }
})
.catch((e) => console.error(e))


