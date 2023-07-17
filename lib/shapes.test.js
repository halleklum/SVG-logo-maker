const {Square, Triangle, Circle} = require('./shapes')

describe("Square test", () => {
    test("test for a square with a green background", () => {
        const shape = new Square();
        const expectedValue = `<rect x="50" width="200" height="200" fill="green" />`
        shape.setColor("green");
        expect(shape.render()).toEqual(expectedValue)
    });
});

describe("Triangle test", () => {
    test("test for a triangle with a blue background", () => {
        const shape = new Triangle();
        shape.setColor("blue");
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="blue">`)
    });
})

describe("Circle test", () => {
    test("test for a circle with a red background", () => {
        const shape = new Circle();
        shape.setColor("red");
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="red">`)
    });
})
