#!/usr/bin/env node
const program = require('commander')
const processCli = require('./process-cli')

const packageFile = require('../package.json')

program.version(packageFile.version)

program.on('--help', function() {
  console.log('')
  console.log('About:')
  console.log(
    '  This application allows you to search through a few JSON files.'
  )
  console.log('')
})

program
  .option('-a, --attributes [attrs]', 'The attributes to search in. Comma separated list', 'all')
  .option('-s, --sort-by [attrs]', 'The attributes to sort the result by. Comma separated list.')
  .option('-s, --sort-order [type]', 'The attributes to sort the result by. asc or desc.', 'asc')

program
  .command('users <query>')
  .alias('u')
  .description('Search through the users in the "database')
  .action(processCli.runSearch)

program.parse(process.argv)
