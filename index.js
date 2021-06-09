require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// init count
let channelCount = -1;
// login discord bot
client.login(process.env.TOKEN);

/* check how many people in the specific channel
   and send the message when count changes. */
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

/* Recursive setTimeout guarantees the given delay 
   between the code execution completion and the next call.
   But, setInterval doesn't guarantee the given delay. */
const mySetInterval = () => {
  setTimeout(async () => {
    await count();
    mySetInterval();
  }, 1500);
};

mySetInterval();
