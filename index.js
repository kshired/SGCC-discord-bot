require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// init values
let channelCount = -1;
let channelPeople = [];
const messageOut = ['어디가ㅏㅏㅏㅏㅏ', '가지마ㅏㅏㅏㅏ'];

// login discord bot
client.login(process.env.TOKEN);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// compare comp with target
const checkDiff = (origin, target) => origin.filter((x) => !target.includes(x));

/* check how many people in the specific channel
   and send the message when count changes. */
const count = async () => {
  const channel = await client.channels.cache.find(
    (channel) => channel.id === process.env.COUNT_CHANNEL
  );

  const members = channel ? Array.from(channel.members) : [];
  const curPeople = members.forEach((x) => x[1].user);
  const curCount = members.length;

  if (channelCount === -1) {
    channelCount = curCount;
    channelPeople = curPeople;
    return;
  }

  if (channelCount > curCount) {
    const people = checkDiff(channelPeople, curPeople);

    for (let person of people) {
      await client.channels.cache
        .find((channel) => channel.id === process.env.TARGET_CHANNEL)
        .send(`${person} ${messageOut[getRandomInt(0, 2)]}`);
    }
  } else if (channelCount < curCount) {
    const people = checkDiff(curPeople, channelPeople);

    for (let person of people) {
      await client.channels.cache
        .find((channel) => channel.id === process.env.TARGET_CHANNEL)
        .send(`${person} 왔구나`);
    }
  }
  channelCount = curCount;
  channelPeople = curPeople;
};

/* Recursive setTimeout guarantees the given delay 
   between the code execution completion and the next call.
   But, setInterval doesn't guarantee the given delay. */
const mySetInterval = () => {
  setTimeout(async () => {
    await count();
    mySetInterval();
  }, 1000);
};

mySetInterval();
