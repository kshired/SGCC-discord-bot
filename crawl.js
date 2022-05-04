const axios = require('axios');

const getData = async () => {
  const config = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    },
  };
  try {
    let res = [];
    for (let i = 1; i < 3; ++i) {
      let data = await axios.get(
        `https://programmers.co.kr/api/posts?page=${i}`,
        config
      );
      res.push(data.data);
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

const getPostOfTheDay = async () => {
  const data = await getData();
  let urlList = [];

  for (let datum of data) {
    for (let post of datum.posts) {
      let url = post.title + ' ( ' + post.url + ' ) ';
      urlList.push(url);
    }
  }

  return urlList[Math.floor(Math.random() * urlList.length)];
};

module.exports = getPostOfTheDay;

