/**
 * Generates a random number between given minimum and maximum number.
 * @param {Number} min Minimum number to include in returned value
 * @param {Number} max Maximum number to include in returned value
 */
const random = 
    (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Generates a random color with rgb values from 0-100 each
 */
const randomColorRGB = 
    () => { return {r: random(0, 100), g: random(0, 100), b: random(0, 100)} };

/**
 * Generates a rgb color string from the given color object
 * @param {Object} color object containing rgb values
 */
const parseColor =
    (color) => `rgb(${color.r},${color.g},${color.b})`;

/**
 * Returns a inverted color object based on given color object
 * @param {Object} color color object containing rbg values
 */
const invertColor = 
    (color) => { return {r: 255 - color.r, g: 255 - color.g, b: 255 - color.b} };

/**
 * Draws a arrow line from given starting to ending positions
 * @param {CanvasRenderingContext2D} context context of canvas object
 * @param {Number} fromx X coordinate of line start
 * @param {Number} fromy Y coordinate of line start
 * @param {Number} tox X coordinate of line end
 * @param {Number} toy Y coordinate of line end
 */
const drawArrow = (context, fromx, fromy, tox, toy) => {
    var headlen = 15;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    drawLine(context, fromx, fromy, tox, toy);

    context.lineWidth = 1;
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

    context.fill();
};

/**
 * Draws a line from given starting to ending positions
 * @param {CanvasRenderingContext2D} context context of canvas object
 * @param {Number} fromx X coordinate of line start
 * @param {Number} fromy Y coordinate of line start
 * @param {Number} tox X coordinate of line end
 * @param {Number} toy Y coordinate of line end
 */
const drawLine = (context, fromx, fromy, tox, toy) => {
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
};

module.exports = {
    randomColorRGB,
    parseColor,
    invertColor,
    random,
    drawArrow,
    drawLine
};