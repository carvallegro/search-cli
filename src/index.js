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
  .action(processCli.runSearchOnUsers)

program
  .command('organizations <query>')
  .alias('o')
  .description('Search through the organisations in the "database')
  .action(processCli.runSearchOnOrganizations)

program
  .on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
    process.exit(1)
  })

program.parse(process.argv)

console.error('No command specified\nSee --help for a list of available commands.', program.args.join(' '))
process.exit(1)
