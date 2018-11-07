# Architecture Generator
It generates Node app module architecture in PNG format. Module architecture is a graph of how your node modules interacts with each other. It enables you to conform to the best practices of having less cohesion between your modules.

## Installation
Install using npm 
```bash
npm install node-architecture
```

## Usage
```sh
$ arch-js --help

Usage: arch-js [options]

Options:

    -O, --out <path>     Output path of generated image (default: /home/app/out.png)
    -S, --src <path>     Root path of source application (default: /home/app)
    -W, --width <n>      Width of generated image
    -H, --height <n>     Height of generated image
    --dfd <n>            DFD level
    --html               Export architecture as interactive HTML
    --watermark [text]   Add custom watermark
    --background <text>  Add custom background (default: transparent)
    -h, --help           output usage information
```

## Dependencies
This project depends on `canvas` package which requires `libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++`. For windows, you would need `.NET Framework` installed. **Dockerfile** is provided with the project if you want to use the package with a docker container.

## Project Architecture
![Project Architecture](https://raw.githubusercontent.com/riteshkukreja/arch-js/master/architecture.png)