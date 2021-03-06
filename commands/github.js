const { MessageEmbed } = require('discord.js');
require('../inlineReplies.js')

module.exports = {
  name: 'github',
  description: 'Gives a link to the GitHub Repository',
  async run(message, args, client) {
    if(await client.db.get(`disabled.github-${message.guild.id}`)) {
      return message.inlineReply(`This command is disabled for this server!`)
    }
    
    const embed = new MessageEmbed()
      .setTitle('Github Repository')
      .setURL('https://github.com/Tur-ph/EmojiHub')
      .setColor('YELLOW')
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
    message.inlineReply(embed);
  }
}