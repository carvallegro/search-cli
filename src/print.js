const join = require('lodash/join')
const isEmpty = require('lodash/isEmpty')
const isNil = require('lodash/isNil')
const mapKeys = require('lodash/mapKeys')

const chalk = require('chalk')
const columnify = require('columnify')
const moment = require('moment')
const terminalLink = require('terminal-link')

const {findOrganizationById, findUserById} = require('./search')

const ZENDESK_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss ZZ'

const TICKET_LEGEND_DATA= [
  {priority: 'urgent', type: 'incident', status: 'closed', via: 'web'},
  {priority: 'high', type: 'problem', status: 'solved', via: 'chat'},
  {priority: 'normal', type: 'question', status: 'hold', via: 'voice'},
  {priority: 'low', type: 'task', status: 'pending'},
  {status: 'open'}
]

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
  organisation: getOrganizationCell(user.organization_id),
  'contact details': `email: ${chalk.blue(user.email)}
    phone: ${chalk.cyan(user.phone)}`,
  tags: join(user.tags, ','),
  'last activity': dateFrom(user.last_login_at)
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
  created: dateFrom(organization.created_at),
  tags: join(organization.tags, ', '),
  'domain names': organization.domain_names.join(', ')
})

const printTickets = (tickets = []) => {
  if (isEmpty(tickets)) {
    console.error(chalk.red('No tickets were found...'))
  }

  const items = tickets.map(getTicketLine)
  printColumns(items, {
    config: {
      tags: { maxWidth: 30 },
    }
  })
  printColumns(TICKET_LEGEND_DATA.map(ticketLegend))
}

const getTicketLine = (ticket) => ({
  subject: `${ticket.subject} ${enrichVia(ticket.via)}
  ${chalk.grey(`id: ${getLink(ticket._id, ticket.url)}`)}`,
  type: enrichType(ticket.type),
  priority: enrichPriority(ticket.priority),
  status: enrichStatus(ticket.status),
  assignee_id: getUserCell(ticket.assignee_id),
  submitter_id: getUserCell(ticket.submitter_id),
  org: getOrganizationCell(ticket.organization_id),
  created: `${dateFrom(ticket.created_at)}
  ${chalk.grey(formatDate(ticket.created_at))}`,
  due: `${dateFrom(ticket.due_at)}
  ${chalk.grey(formatDate(ticket.due_at))}`,
  tags: join(ticket.tags, ', ')
})

const getOrganizationCell = organizationId => {
  if(isNil(organizationId)) {
    return undefined
  }

  const organization = findOrganizationById(organizationId)
  if(isNil(organization)){
    return undefined;
  }

  return `${organization.name} ${chalk.grey(organizationId)}`
}

const getUserCell = userId => {
  if(isNil(userId)) {
    return undefined
  }

  const user = findUserById(userId)
  if(isNil(user)){
    return undefined;
  }

  return `${user.name} ${chalk.grey(userId)}`
}

const printColumns = (items, config = {}) => console.log(columnify(items, { ...COMMON_CONFIG, ...config}))

const getLink = (text, link) => terminalLink.isSupported ? terminalLink(text, link) : text

const formatDate = date => moment(date, ZENDESK_DATE_FORMAT).format('DD-MM-YY, h:mma')

const dateFrom = date => moment(date, ZENDESK_DATE_FORMAT).from()

const enrichPriority = priority => {
  switch (priority) {
    case'urgent':
      return '😱'
    case 'high':
      return '😨'
    case 'normal':
      return '😟'
    case 'low':
      return '😕'
    default:
      return `🤔${priority}`
  }
}

const enrichType = type => {
  switch (type) {
    case 'incident':
      return '‼️'
    case 'problem':
      return '❗'
    case 'question':
      return '❓'
    case 'task':
      return '📌'
    default:
      return '🤔'
  }
}

const enrichStatus = status => {
  switch (status) {
    case 'closed':
      return '🚫'
    case 'solved':
      return '✅'
    case 'hold':
      return '✋'
    case 'pending':
      return '🕙'
    case 'open':
      return '📬'
    default:
      return `🤔${status}`
  }
}

const enrichVia = via => {
  switch(via){
    case 'web': return '🌍'
    case 'chat': return '📱'
    case 'voice':  return '🗣'
    default:
      return via
  }
}

const ticketLegend = ({priority, type, status, via}) => ({
  priority: priority ? `${enrichPriority(priority)} ${colorPriority(priority)}` : '',
  type: type ? `${enrichType(type)} ${type}` : '',
  status: status ? `${enrichStatus(status)} ${colorStatus(status)}` : '',
  via: via ? `${enrichVia(via)} ${via}` : '',
})

const colorPriority = priority => {
  switch (priority) {
    case'urgent':
      return chalk.red(priority)
    case 'high':
      return chalk.yellow(priority)
    case 'normal':
      return chalk.blue(priority)
    case 'low':
      return chalk.cyan(priority)
    default:
       return priority
  }
}

const colorStatus = status => {
  switch (status) {
    case 'closed':
      return chalk.red(status)
    case 'solved':
      return  chalk.green(status)
    case 'hold':
      return  chalk.yellow(status)
    case 'pending':
      return chalk.yellow(status)
    case 'open':
      return chalk.blue(status)
    default:
      return status
  }
}

const printKeys = keys => mapKeys(keys, (v, k) => console.log('\t', chalk.bold(k), join(v, ', ')))

module.exports = {
  printUsers,
  printOrganizations,
  printTickets,
  printKeys,
  utils: {
    getOrganizationCell,
    getUserCell,
    getLink,
    formatDate,
    dateFrom,
    enrichPriority,
    enrichType,
    enrichStatus,
    enrichVia,
    colorPriority,
    colorStatus
  }
}
