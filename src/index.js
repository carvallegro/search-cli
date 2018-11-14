#!/usr/bin/env node
var program = require('commander');

var package = require('../package.json')

program
  .version(package.version)

program.on('--help', function(){
    console.log('')
    console.log('About:');
    console.log('  This application allows you to search through a few JSON files.');
    console.log('')
});

program.parse(process.argv);

console.log('Hello World');