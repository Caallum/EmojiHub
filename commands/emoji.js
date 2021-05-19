require('../inlineReplies.js');
const { Util } = require('discord.js');

module.exports = {
  name: 'emoji',
  description: 'Adds an emoji to the server',
  async run(message, args, client) {
    if(!message.guild) return message.inlineReply('You can only do this inside servers!');
    if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.inlineReply('You do not have permission to do that!');
    if(!args.length) return message.inlineReply('Please specify which emojis!');
    
    let addedEmojis = [];
    
    for(const rawEmoji of args) {
      const parseEmoji = await Util.parseEmoji(rawEmoji);
      
      if(parseEmoji.id) {
        const extension = parseEmoji.animated ? '.gif' : '.png';
        const url = `https://cdn.discordapp.com/emojis/${parseEmoji.id + extension}`;
        message.guild.emojis.create(url, parseEmoji.name)
        addedEmojis.push(parseEmoji.id);
      } else return message.inlineReply('Something went wrong..');
    }
    
    if(addedEmojis.length <= 0) return message.inlineReply('Something went wrong...')
    message.channel.send(`Successfully added ${addedEmojis.length} emojis!`)
    
    
  }
}