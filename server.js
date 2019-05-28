const axios = require('axios')

const Discord = require('discord.js')
const client = new Discord.Client()

require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('with Fire | !help')
})

client.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'Member')
  member.addRole(role)
  member.guild.channels
    .get('579572740005036032')
    .send('**' + member.user.username + '**, has joined the server!')
})

client.on('message', msg => {
  if (msg.author == client.user) {
    // Prevent bot from responding to its own messages
    return
  }

  if (msg.content.startsWith('!')) {
    processCommand(msg)
  }
})

function processCommand(msg) {
  let fullCommand = msg.content.substr(1) // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(' ') // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

  console.log('Command Recieved: ' + primaryCommand)
  console.log('Arguments: ' + arguments)

  if (primaryCommand == 'help') {
    helpCommand(arguments, msg)
  } else if (primaryCommand == 'dracarys') {
    dracarysCommand(arguments, msg)
  } else if (primaryCommand == 'uptime') {
    uptimeCommand(arguments, msg)
  } else if (primaryCommand == 'info') {
    infoCommand(arguments, msg)
  } else if (primaryCommand == 'dog') {
    dogCommand(arguments, msg)
  } else if (primaryCommand == 'cat') {
    catCommand(arguments, msg)
  }
}

function embedBuilder(command, description, picture) {
  return new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setFooter('DrogonBot | Made by Brandon Pessman', '')
    .setImage(picture)
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
    .addField('**Command:** !' + command, description)
}

function helpCommand(arguments, msg) {
  const embed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setFooter('DrogonBot | Made by Brandon Pessman', '')
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
    .addField('**Command:** !help', 'Here is a list of helpful commands.')
    .addField(
      'Random Commands',
      '!dracarys - Use with caution.\n!cat - Gives a random cat image\n!dog - Gives a random dog image'
    )
    .addField(
      'Information Commands',
      '!info - Basic info about this bot.\n!uptime - Displays the bot uptime.'
    )

  msg.channel.send({ embed })
}

// Command for funny fire command
function dracarysCommand(arguments, msg) {
  const embed = embedBuilder(
    'dracarys',
    'Drogon spews his fire at you! He only takes commands from the Mother of Dragons...',
    'http://clipart-library.com/images/zTX5njBGc.jpg'
  )

  msg.channel.send({ embed })
}

// Command for getting BotInfo
function infoCommand(arguments, msg) {
  const embed = embedBuilder(
    'info',
    'Drogon was built as a learning project. It is an all-purpose bot, with a Game of Thrones Theme.',
    ''
  )

  msg.channel.send({ embed })
}

// Command for Bot Uptime
function uptimeCommand(arguments, msg) {
  const embed = embedBuilder(
    'uptime',
    'Server Uptime: ' + process.uptime() + ' seconds',
    ''
  )

  msg.channel.send({ embed })
}

// Command for Dog Picture
function dogCommand(arguments, msg) {
  var embed
  axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
    embed = embedBuilder(
      'dog',
      'Here is a yummy looking dog!',
      '' + response.data.message
    )
    msg.channel.send({ embed })
  })
}

// Command for Cat Picture
function catCommand(arguments, msg) {
  axios.get('https://api.thecatapi.com/v1/images/search').then(response => {
    console.log(response.data[0])
    embed = embedBuilder(
      'dog',
      'Here is a yummy looking cat!',
      '' + response.data[0].url
    )
    msg.channel.send({ embed })
  })
}

client.login(process.env.BOT_TOKEN)
