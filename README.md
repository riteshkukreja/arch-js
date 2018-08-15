# Architecture Generator
It generates Node app module architecture in PNG format. Module architecture is a graph of how your node modules interacts with each other. It enables you to conform to the best practices of having less cohesion between your modules.

## Installation
Install using npm 
```bash
npm install node-architecture -g
```

## Usage
```sh
$ arch-js --help

Usage: arch-js [options]

Options:

    -O, --out <path>     Output path of generated image (default: /home)
    -S, --src <path>     Root path of source application (default: /home)
    -W, --width <n>      Width of generated image
    -H, --height <n>     Height of generated image
    --watermark [text]   Add custom watermark
    --background <text>  Add custom background (default: transparent)
    -h, --help           output usage information
```

## Project Architecture
![Project Architecture](https://raw.githubusercontent.com/riteshkukreja/arch-js/master/architecture.png)