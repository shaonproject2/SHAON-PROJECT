const request = require("request");
const fs = require("fs");

module.exports.config = {
 name: "rndm",
 version: "1.0.0",
 hasPermission: 0,
 credits: "Shaon",
 description: "Send a random sad video",
 commandCategory: "media",
 usages: "",
 cooldowns: 5
};

 module.exports.run = async function ({ api, event, args, langText }) {
 const axios = require("axios");
 const nameParam = args.join(" ");
 if (!args[0]) return api.sendMessage(langText("missing"), event.threadID, event.messageID);

 try {
 const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json');
 const n = apis.data.api;
 const res = await axios.get(`${n}/video/random?name=${encodeURIComponent(nameParam)}`);

 const videoUrl = res.data.url;
 const name = res.data.name;
 const cp = res.data.cp;
 const ln = res.data.count;
 const filePath = __dirname + "/cache/video.mp4";

 const file = fs.createWriteStream(filePath);
 request(videoUrl)
 .pipe(file)
 .on("close", () => {
 return api.sendMessage({
 body: `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
 attachment: fs.createReadStream(filePath)
 }, event.threadID, event.messageID);
 });

 } catch (err) {
 console.error(err);
 return api.sendMessage("Something went wrong. Please try again later.", event.threadID, event.messageID);
 }
 };
