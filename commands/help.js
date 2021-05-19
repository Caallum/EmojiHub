require('../inlineReplies.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Shows a help menu',
  async run(message, args, client) {
    if(await client.db.get(`disabled.help-${message.guild.id}`)) {
      return message.inlineReply(`This command is disabled for this server!`)
    }
    
    let embed1 = new MessageEmbed()
      .setTitle('Help Menu')
      .setColor('YELLOW')
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setDescription(`To invite Emoji Hub [Click Here](https://discord.com/api/oauth2/authorize?client_id=843524483833921567&permissions=1073810496&scope=bot)`)
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));
      
    client.commands.forEach(cmd => {
      if(cmd.description && cmd.name) {
        embed1.addField(`\`e!${cmd.name}\``, cmd.description)
      }
    });
    
    message.inlineReply(embed1);
  }
}