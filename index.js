require('dotenv').config();

const discord = require('discord.js');
const client = new discord.Client();
const { readdirSync } = require('fs');
client.commands = new discord.Collection();

client.login(process.env.token);

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split('.')[0];
  client.on(eventName, event.bind(null, client));
}

require('./websocket.js');