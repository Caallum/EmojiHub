require('../inlineReplies.js')

module.exports = (client, message) => {
  if(!message.content.startsWith('e!') && !message.author.bot) {
    if(message.mentions.members.first()) {
      if(message.mentions.members.first().id == client.user.id) {
        message.inlineReply(`My prefix is: \`e!\``);
      }
    }
  }
  if(!message.content.startsWith('e!') || message.author.bot) return;
  
  let args = message.content.slice('e!'.length).trim().split(/ +/);
  let commandName = args.shift().toLowerCase();
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  if(!command) return;
  
  command.run(message, args, client);
}