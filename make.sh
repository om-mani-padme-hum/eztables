#!/bin/bash

echo Compiling SCSS...
sass scss/eztables.scss css/eztables.css

echo Done!  Starting Example...
node example.js
