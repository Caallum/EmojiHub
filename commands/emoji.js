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
      const parseEmoji = Util.parseEmoji(rawEmoji);
      
      if(parseEmoji.id) {
        const extension = parseEmoji.animated ? '.gif' : '.png';
        const url = `https://cdn.discordapp.com/emojis/${parseEmoji.id + extension}`;
        message.guild.emojis.create(url, parseEmoji.name);
        
        addedEmojis.push(parseEmoji);
      }
    }
    
    if(addedEmojis.length == 0) return;
    message.inlineReply(`Successfully added ${addedEmojis.length} emojis!`);
    addedEmojis.forEach(emoji => {
      message.react(emoji.id);
    })
  }
}