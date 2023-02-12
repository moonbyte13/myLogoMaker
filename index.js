// imports
const inquirer = require('inquirer')
const fs = require('fs')
// Local imports
const { Html, Shape, Circle, Triangle, Square, Rectangle } = require('./lib/shapes.js');

// regex const
const hexRegex = /^([a-fA-F0-9]{6}||[a-fA-F0-9]{3})$/
const svgColorKeywordRegex = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/;

// questions const
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

// function createSVG to create the svg file
function createSVG(data) {
  process.chdir('./lib/dist');
  fs.writeFile('logo.svg', data, () => console.log('Generated logo.svg'));
}

// function createHTML to create the html file
function createHTML(data) {
  fs.writeFile('logo.html', data, () => console.log('Generated logo.html'))
}

// inquirer prompt
inquirer

  // prompt user for questions
  .prompt(questions)

// then take answers and do this callback
  .then((answers) => {
    const hexRegStart = /^#/

    // check if answers is less then or equal to 3 and not 0
    if((answers.text.length <= 3 && answers.text.length !== 0)){

      // check if textColor starts with #
      if (hexRegStart.test(answers.textColor)) {
        // set textColor to sliced string without #
        answers.textColor = answers.textColor.slice(1)
      }
      // check if shapeColor starts with #
      if (hexRegStart.test(answers.shapeColor)) {
        // set shapeColor to sliced string without #
        answers.shapeColor = answers.shapeColor.slice(1)
      }
      // check if colors match the Regex
      if(
        (hexRegex.test(answers.textColor) ||
        svgColorKeywordRegex.test(answers.textColor.toLowerCase())) && 
        (hexRegex.test(answers.shapeColor) ||
        svgColorKeywordRegex.test(answers.shapeColor.toLowerCase()))
      ){
        
        // add # to regex colors
        if(hexRegex.test(answers.textColor) &&! hexRegStart.test(answers.textColor)) {
          answers.textColor = `#${answers.textColor}`
        }
        // add # to regex colors
        if(hexRegex.test(answers.shapeColor) &&! hexRegStart.test(answers.shapeColor)) {
          answers.shapeColor = `#${answers.shapeColor}`
        }
        
        // define newSVG so that it can be re-assigned to a new class obj
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
        const renderSVGReturn = shape.render(
          answers.text,
          answers.textColor.toLowerCase(),
          newSVG.shapePath,
          answers.shapeColor.toLowerCase()
        )
        const html = new Html()
        const renderHTMLReturn = html.render(renderSVGReturn)
        // console.log(renderReturn);
        createSVG(renderSVGReturn);
        createHTML(renderHTMLReturn);
        // console.log(answers);
      }else{
        console.error('Please Enter at a valid hex code or color keyword.');
      }
    }else{
      console.error('Please Enter at least 1 character and no more than 3 characters.');
    }
  })
  .catch((e) => console.error(e))

// export? not sure if needed, I was trying to do a test on the inquirer prompts and I was using it for that
module.exports = (questions) => {
  return inquirer.prompt(questions)
}