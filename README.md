# Architecture Generator
It generates Node app module architecture in PNG format. Module architecture is a graph of how your node modules interacts with each other. It enables you to conform to the best practices of having less cohesion between your modules.

## Installation
Install using npm 
```bash
npm install @arch/js -g
```

## Usage
```sh
$ arch-js --help

Usage: arch-js [options]

Options:

-O, --out <path>  Output path of generated image (default: <current-dir>)
-S, --src <path>  Root path of source application (default: <current-dir>)
-W, --width <n>   Root path of source application
-H, --height <n>  Root path of source application
-h, --help        output usage information
```

## Project Architecture
![Project Architecture](https://raw.githubusercontent.com/riteshkukreja/arch-js/master/architecture.png)