require('../inlineReplies.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'support',
 description: 'Not released yet',
  async run(message, args, client) {
    if(await client.db.get(`disabled.support-${message.guild.id}`)) return message.inlineReply('That command is disabled for this server!');
    
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setDescription('Coming soon!')
      .setColor('YELLOW')
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
    message.inlineReply(embed);
  }
}