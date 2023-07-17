const inquirer = require('inquirer');
const fs = require('fs');
const {Square, Triangle, Circle} = require('./lib/shapes')


const questions = [
    {
        type: "input",
        name: "text",
        message: "What do you want the text to be? Enter 1-3 characters",
        validate: (text) => text.length <= 3 || "Must be between 1-3 characters"
    }, {
        type: "input",
        name: "text-color",
        message: "Text Color:",
    }, {
        type: "list",
        name: "shape",
        message: "What shape would you like?",
        choices: ["Circle", "Triangle", "Square",],
    }, {
        type: "input",
        name: "shape-color",
        message: "What color do you want your shape?"
    },
];

class Svg{
    constructor(){
        this.textInput = ''
        this.shapeInput = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeInput}${this.textInput}</svg>`
    }
    setTextElement(text,color){
        this.textInput = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeInput = shape.render()

    }
}

function writeFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your logo has been created");
    });
}

async function init() {
	var svgString = "";
	var svgFile = "logo.svg";

    const answers = await inquirer.prompt(questions);

    chosenText = answers["text"];
    chosenTextColor = answers["text-color"];
    chosenShapeType = answers.shape;
    chosenShapeColor = answers["shape-color"];

    let userShape;
	if (chosenShapeType === "Square" || chosenShapeType === "square") {
		userShape = new Square();
	}
	else if (chosenShapeType === "Circle" || chosenShapeType === "circle") {
		userShape = new Circle();
	}
	else if (chosenShapeType === "Triangle" || chosenShapeType === "triangle") {
		userShape = new Triangle();
	}
    userShape.setColor(chosenShapeType);

    // Adding shape and text to new svg instance
    var svg = new Svg();
    svg.setTextElement(chosenText, chosenTextColor);
    svg.setShapeElement(userShape);
    svgString = svg.render();

    console.log(svgString);
    writeFile(svgFile, svgString)
}


init()