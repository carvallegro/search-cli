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

const printUsers = (users = []) => {
  if (isEmpty(users)) {
    console.error(chalk.red('No users were found...'))
  }
  const usersToPrint = users.map(getUserLineData)
  printColumns(usersToPrint)
}

const getUserLineData = user => ({
  id: chalk.grey(getLink(user._id, user.url)),
  status: user.verified ? '✅' : '❌',
  name: `${chalk.green(user.name)} ${chalk.grey(`(aka ${user.alias})`)}`,
  organisation: user.organization_id,
  'contact details': `email: ${chalk.blue(user.email)}
    phone: ${chalk.cyan(user.phone)}`,
  tags: join(user.tags, ','),
  'last activity': moment(user.last_login_at, ZENDESK_DATE_FORMAT).from()
})

const printOrganizations = (organizations = []) => {
  if (isEmpty(organizations)) {
    console.error(chalk.red('No organizations were found...'))
  }

  const organizationsToPrint = organizations.map(getOrganizationLine)
  printColumns(organizationsToPrint)
}

const getOrganizationLine = organization => ({
  id: chalk.grey(getLink(organization._id, organization.url)),
  name: `${chalk.green(organization.name)} ${chalk.grey(`(${organization.details})`)}`,
  'shared tickets': organization.shared_tickets ? '✅' : '❌',
  created: moment(organization.created_at, ZENDESK_DATE_FORMAT).from(),
  tags: join(organization.tags, ', '),
  'domain names': organization.domain_names.join(', ')
})

const printTickets = (tickets = []) =>
{
  if (isEmpty(tickets)) {
    console.error(chalk.red('No tickets were found...'))
  }

  const items = tickets.map(getTicketLine)
  printColumns(items)
}

const getTicketLine = (ticket) => ({
  subject: `${ticket.subject}
  ${chalk.grey(`(id: ${getLink(ticket)})`)}`,
})

const getLink = (text, link) => terminalLink.isSupported ? terminalLink(text, link) : text

const printColumns = items => console.log(columnify(items, COMMON_CONFIG))

module.exports = {
  printUsers,
  printOrganizations,
  printTickets
}
