const join = require('lodash/join')
const isEmpty = require('lodash/isEmpty')
const chalk = require('chalk')
const columnify = require('columnify')
const terminalLink = require('terminal-link')
const moment = require('moment')

const ZENDESK_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss ZZ'

const COMMON_CONFIG = {
  minWidth: 3,
  preserveNewLines: true,
  headingTransform: heading => chalk.underline(heading.toUpperCase()),
  config: {
    id: { showHeaders: false },
    tags: { maxWidth: 50 }
  }
}

const USER_CONFIG = COMMON_CONFIG

const listUsers = (users = []) => {
  if (isEmpty(users)) {
    console.error(chalk.red('No users were found...'))
  }
  console.log(columnify(users.map(getUserLineData), USER_CONFIG))
}

const getUserLineData = user => ({
  id: getChalkedId(user),
  status: user.verified ? '✅' : '❌',
  name: `${chalk.green(user.name)} ${chalk.grey(`(aka ${user.alias})`)}`,
  organisation: user.organization_id,
  'contact details': `email: ${chalk.blue(user.email)}
    phone: ${chalk.cyan(user.phone)}`,
  tags: join(user.tags, ','),
  'last activity': moment(user.last_login_at, ZENDESK_DATE_FORMAT).from()
})

const listOrganizations = (organizations = []) => {
  if (isEmpty(organizations)) {
    console.error(chalk.red('No organizations were found...'))
  }

  console.log(columnify(organizations.map(getOrganizationLine), COMMON_CONFIG))
}

const getOrganizationLine = organization => ({
  id: getChalkedId(organization),
  name: `${chalk.green(organization.name)} ${chalk.grey(`(${organization.details})`)}`,
  'shared tickets': organization.shared_tickets ? '✅' : '❌',
  created: moment(organization.created_at, ZENDESK_DATE_FORMAT).from(),
  tags: join(organization.tags, ', '),
  'domain names': organization.domain_names.join(', ')
})

const getChalkedId = entity => terminalLink.isSupported ? terminalLink(chalk.grey(entity._id), entity.url) : chalk.grey(entity._id)

module.exports = {
  listUsers,
  listOrganizations
}
