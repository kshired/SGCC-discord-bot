require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// init count
let channelCount = -1;

// check how many people in the specific channel
// and send the message when count changes.
const count = async () => {
  const channel = await client.channels.cache.find(
    (channel) => channel.id === process.env.COUNT_CHANNEL
  );
  const curCount = channel.members.size;
  if (channelCount === -1) {
    channelCount = curCount;
    return;
  }
  if (channelCount > curCount) {
    await client.channels.cache
      .find((channel) => channel.id === process.env.TARGET_CHANNEL)
      .send('어디가ㅏㅏㅏ');
  } else if (channelCount < curCount) {
    await client.channels.cache
      .find((channel) => channel.id === process.env.TARGET_CHANNEL)
      .send('왔구나');
  }
  channelCount = curCount;
};

// every 1.5 seconds do count
setInterval(() => {
  count();
}, 1500);

// login discord bot
client.login(process.env.TOKEN);
