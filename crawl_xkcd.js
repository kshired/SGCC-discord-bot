const axios = require("axios");

const target = "https://c.xkcd.com/random/comic/";

const findData = async () => {
  const response = await axios.get(target)
  const data = response.data;
  const a = data.indexOf("<div id=\"comic\">\n<img src=\"");
  const data_found = data.slice(a+29);
  const b = data_found.indexOf("png");
  return "https://" + data_found.slice(0,b) + "png";
}

module.exports = findData; 
