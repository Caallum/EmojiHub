const databaseInstance = require('../database.js');
const { readdirSync } = require('fs');
const { version } = require('../package.json');

module.exports = (client) => {
  console.log(`${client.user.tag} is online`);
  client.user.setActivity(`Version ${version} | Emoji Hub`, { type: 'PLAYING' });
  client.db = new databaseInstance(process.env.mongo, { name: 'database' })
  client.db
    .on('connected', (info) => console.log(info))
    .on('error', (err) => console.log(err));
  
  const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
  }

}