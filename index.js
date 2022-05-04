require('dotenv').config();
const Discord = require('discord.js');
const findData = require('./crawl_xkcd.js');
const client = new Discord.Client();


// init values
let channelCount = -1;
let channelPeople = [];
const messageOut = ['어디가ㅏㅏㅏㅏㅏ', '가지마ㅏㅏㅏㅏ'];

// login discord bot
client.login(process.env.TOKEN);

const getRandomImgUrl = () => {
	return "https://picsum.photos/200/300";
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// compare comp with target
const checkDiff = (origin, target) => {
  let people = [];
  for (let person of origin) {
    if (!target.includes(person)) {
      people.push(person);
    }
  }
  return people;
};

/* check how many people in the specific channel
   and send the message when count changes. */
const count = async () => {
  const channel = await client.channels.cache.find(
    (channel) => channel.id === process.env.COUNT_CHANNEL
  );

  const members = channel ? Array.from(channel.members) : [];
  const curPeople = members.map((x) => {
	return x[1].displayName;
  });
  const curCount = members.length;

  if (channelCount === -1) {
    channelCount = curCount;
    channelPeople = curPeople;
    return;
  }

  if (channelCount > curCount) {
    const people = checkDiff(channelPeople, curPeople);

    for (let person of people) {
	  console.log(JSON.stringify(person))
      await client.channels.cache
        .find((channel) => channel.id === process.env.TARGET_CHANNEL)
        .send(`${person} ${messageOut[getRandomInt(0, 2)]}`);
    }

    if (curCount === 0) {
      await client.channels.cache
        .find((channel) => channel.id === process.env.TARGET_CHANNEL)
        .send(`내 인터넷 친구들 어디가써!`);
	  const url = await findData();
	  await client.channels.cache
		.find((channel) => channel.id === process.env.TARGET_CHANNEL)
		.send("random xkcd img", {files:[url]});
	}
  } else if (channelCount < curCount) {
    const people = checkDiff(curPeople, channelPeople);

    for (let person of people) {
      await client.channels.cache
        .find((channel) => channel.id === process.env.TARGET_CHANNEL)
    	.send(`${person} 왔구나! 2학기 개강 D-${Math.floor((new Date("2022-09-01")-new Date())/(1000*3600*24))}!!!!`);
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


