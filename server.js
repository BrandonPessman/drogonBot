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
    .addField('Random Commands', '!dracarys - Use with caution.\n')

  msg.channel.send({ embed })
}

function dracarysCommand(arguments, msg) {
  const embed = embedBuilder(
    'dracarys',
    'Drogon spews his fire at you! He only takes commands from the Mother of Dragons...',
    'http://clipart-library.com/images/zTX5njBGc.jpg'
  )

  msg.channel.send({ embed })
}

client.login(process.env.BOT_TOKEN)
