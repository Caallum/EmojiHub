require('../inlineReplies.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Shows a help menu',
  async run(message, args, client) {
    let embed1 = new MessageEmbed()
      .setTitle('Help Menu')
      .setColor('YELLOW')
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
      
    client.commands.forEach(cmd => {
      if(cmd.description && cmd.name) {
        embed1.addField(`**${cmd.name}**`, cmd.description)
      }
    });
    
    message.inlineReply(embed1);
  }
}