const random = 
    (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomColorRGB = 
    () => { return {r: random(0, 100), g: random(0, 100), b: random(0, 100)} };

const randomColor =
    (color) => `rgb(${color.r},${color.g},${color.b})`;

const invertColor = 
    (color) => { return {r: 255 - color.r, g: 255 - color.g, b: 255 - color.b} };

module.exports = {
    randomColorRGB,
    randomColor,
    invertColor,
    random
};