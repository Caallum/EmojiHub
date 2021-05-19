let staffRole = '843875974671761419',
    devRole = '843875904114655263',
    adminRole = '843875943030587424';
require('../inlineReplies.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'command-menu',
  description: 'Allows a support member to enable or disable a command in a server',
  aliases: ['commands', 'command-enable', 'command-disable'],
  async run(message, args, client) {
    let guild = client.guilds.cache.get('843875869188423761');
    if(!guild) return message.inlineReply('An error has occured! Please try again later');
    
    let member = await guild.members.fetch(message.author.id);
    if(!member) return message.inlineReply('You do not have permission to do that!');
    
    if(!member.roles.cache.has(staffRole) && !member.roles.cache.has(devRole) && !member.roles.cache.has(adminRole)) return message.inlineReply('You do not have permission to do that!');
    
    let logChannel = await client.channels.cache.get('843955369243312158');
    if(!logChannel) return message.inlineReply('An error has occured! Please try again later');
    
    let commandGithub = await client.db.get(`disabled.github-${message.guild.id}`);
    let commandHelp = await client.db.get(`disabled.help-${message.guild.id}`);
    let commandSupport = await client.db.get(`disabled.support-${message.guild.id}`);
    let githubStatus;
    let helpStatus;
    let supportStatus;
    
    if(commandGithub == true) {
      githubStatus = 'Disabled';
    } else {
      githubStatus = 'Enabled';
    }
    if(commandHelp == true) {
      helpStatus = 'Disabled';
    } else {
      helpStatus = 'Enabled';
    }
    if(commandSupport == true) {
      supportStatus = 'Disabled';
    } else {
      supportStatus = 'Enabled';
    }
    
    let logEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setDescription(`Server: ${message.guild.name} (${message.guild.id})`)
    
    const embed = new MessageEmbed()
      .setTitle('Command Enable Menu')
      .setDescription(`Please choose the reaction based on the command you wish to disabled`)
      .setColor('YELLOW')
      .setFooter('Emoji Hub | Prompt expires in 2 minutes', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
      .addField('1️⃣ GitHub', 'Status: ' + githubStatus, true)
      .addField('2️⃣ Help', 'Status: ' + helpStatus, true)
      .addField('3️⃣ Support', 'Status: ' + supportStatus, true)
      
    let msg = await message.channel.send(embed)
      
    msg.react('1️⃣');
    msg.react('2️⃣');
    msg.react('3️⃣')
    let filter = (reaction, user) => {
      return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    
    let rank = member.roles.highest.name;
    
    msg.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
    .then(async (collected) => {
      let reaction = collected.first();
      
      if(reaction.emoji.name == '1️⃣') {
        if(commandGithub == true) {
          await client.db.set(`disabled.github-${message.guild.id}`, false);
          msg.delete();
          logEmbed
            .setTitle('Command Enabled')
            .addField('Command:', '\`e!github\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank)
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully enabled \`e!github\``);
        } else {
          await client.db.set(`disabled.github-${message.guild.id}`, true);
          msg.delete();
          logEmbed
            .setTitle('Command Disabled')
            .addField('Command:', '\`e!github\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank)
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully disabled \`e!github\``);
        }
      } else if(reaction.emoji.name == '2️⃣') {
        if(commandHelp == true) {
          await client.db.set(`disabled.help-${message.guild.id}`, false);
          msg.delete();
          logEmbed
            .setTitle('Command Enabled')
            .addField('Command:', '\`e!help\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank)
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully enabled \`e!help\``);
        } else {
          await client.db.set(`disabled.help-${message.guild.id}`, true);
          msg.delete();
          logEmbed
            .setTitle('Command Disabled')
            .addField('Command:', '\`e!help\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank)
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully disabled \`e!help\``);
        }
      } else if(reaction.emoji.name == '3️⃣') {
        if(commandSupport == true) {
          await client.db.set(`disabled.support-${message.guild.id}`, false);
          msg.delete();
          logEmbed
            .setTitle('Command Enabled')
            .addField('Command:', '\`e!support\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank)
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully enabled \`e!support\``);
        } else {
          await client.db.set(`disabled.support-${message.guild.id}`, true);
          msg.delete();
          logEmbed
            .setTitle('Command Disabled')
            .addField('Command:', '\`e!support\`', true)
            .addField('User:', message.author.tag, true)
            .addField('Rank:', rank);
          logChannel.send(logEmbed);
          return message.inlineReply(`Successfully disabled \`e!suppot\``);
        }
      }
    })
    .catch(collected => {
      msg.delete();
      return message.inlineReply(`Prompted has expired!`);
    })
  }
}