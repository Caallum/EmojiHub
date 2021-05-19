let devRole = '843875904114655263';
require('../inlineReplies.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server',
  async run(message, args, client) {
    let guild = client.guilds.cache.get('843875869188423761');
    if(!guild) return message.inlineReply('An error has occured! Please try again later');

    let member = await guild.members.fetch(message.author.id);
    if(!member) return message.inlineReply('You do not have permission to do that!');

    
    if(!member.roles.cache.has(devRole)) return message.inlineReply('You do not have permission to do that!');

    
    if(!args[0]) return message.inlineReply('Please reply with a search query!');
    let mssg = await message.channel.send('Please wait...')
    
    if(args[0].toLowerCase() == 'leave') {
      if(!isNaN(args[1])) {
        let guild = await client.guilds.cache.get(args[1]);
        if(!guild) {
          mssg.delete();
          return message.inlineReply('I cannot find that server!');
        }
      
        guild.leave()
          .then(g => {
            mssg.delete();
            return message.inlineReply(`Successfully left ${g.name} (${g.id})!`);
          })
          .catch(err => {
            mssg.delete();
            console.log(`[ERROR] Location: leaveserver.js:29 Message: ${err}`);
            return message.inlineReply(`An error has occured! Please try again.`)
          })
      };
      
      return;
    }
    
    let query = args.slice(0).join(' ');
    let guilds = [];
    await client.guilds.cache.each(async (guild) => {
      if(guild.name.toLowerCase().includes(query.toLowerCase())) {
        await guilds.push(guild);
      }
    })
    if(guilds.length <= 0) return message.inlineReply('No results found');
    
    let embed = new MessageEmbed()
      .setTitle('Results')
      .setColor('YELLOW')
      .setDescription(`${guilds.length} results found`)
      .setFooter('Emoji Hub', client.user.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
      let cuttedGuilds = guilds.slice(0, 25);
      await cuttedGuilds.forEach(async (guild) => {
        let owner = guild.owner ? guild.owner.user : await client.users.cache.get(guild.ownerID);
        embed.addField(guild.name + ` (${guild.id})`, `Owner: ${owner.tag} (${owner.id})`);
      });
      
      await mssg.delete();
      message.inlineReply(embed);
  }
}