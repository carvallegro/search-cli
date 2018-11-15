const isEmpty = require('lodash/isEmpty')
const chalk = require('chalk')
const columnify = require('columnify')
const terminalLink = require('terminal-link');
const moment = require('moment')

const ZENDESK_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss ZZ'

const USER_CONFIG = {
  minWidth: 3,
  preserveNewLines: true,
  headingTransform: heading => chalk.underline(heading.toUpperCase()),
  config: {
    id: { showHeaders: false },
    tags: { maxWidth: 50 }
  }
}
const listUsers = (users = []) => {
  if(isEmpty(users)) {
    console.log(chalk.red('No users were found...'))
  }
  console.log(columnify(users.map(getUserLineData), USER_CONFIG))
}

const getUserLineData = user => ({
  id: terminalLink.isSupported ? terminalLink(chalk.grey(user._id), user.url) : chalk.grey(user._id),
  status: user.verified ? '✅' : '❌',
  name: `${chalk.green(user.name)} ${chalk.grey(`(aka ${user.alias})`)}`,
  organisation: user.organization_id,
  'contact details': `email: ${chalk.blue(user.email)}
    phone: ${chalk.cyan(user.phone)}`,
  tags: user.tags.join(', '),
  'last activity': moment(user.last_login_at, ZENDESK_DATE_FORMAT).from()
})

module.exports = {
  listUsers
}
