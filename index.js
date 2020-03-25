const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const cheerio = require('cheerio');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1146620968:AAFJmrFmdghWBUUWxDEx9KYi05h-GJLgsI4';
const bot = new TelegramBot(token, {polling: true});
var finalResult = [];
// Create a bot that uses 'polling' to fetch new updates

// Matches "/echo [whatever]"
bot.onText(/\/stat (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
 const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  const mask = "\u{1F637}";
  const skull = "\u{1F480}";
  const hospital = "\u{1F3E5}";
  const bot = new TelegramBot(token, {polling: true});

  request('https://www.worldometers.info/coronavirus/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
//to display a specific column from the table
    $('.main_table_countries_div > table > tbody > tr ').each((i, el) => {
      const tds1 = $(el).find("td");
     
      var TotalDeath = $(tds1[3]).text().replace(/\s\s+/g, '');
      var newCase = $(tds1[2]).text().replace(/\s\s+/g, '');
      var infected = $(tds1[1]).text().replace(/\s\s+/g, '');
      var inCou = $(tds1[0]).text().replace(/\s\s+/g, '');
      if(newCase === "")
      newCase = "0";
      if(infected === "")
      infected = "0";
     if(TotalDeath === "")
      TotalDeath = "0";
      var selectedCountry = match[1];
       if(inCou.toLowerCase() === selectedCountry.toLowerCase()){
        finalResult = {"Country" : inCou,  "\n  Infected ": infected, "\n New Cases" :  newCase, "Total Death ":TotalDeath};
        bot.sendMessage(chatId, "Country = " + inCou +  "\nInfected "+hospital+" ="+ infected+ "\nNew Cases "+ mask+" =" +  newCase+ "\nTotal Death "+ skull +" ="+TotalDeath);
       console.log(finalResult);
      }
    });
   

   
  }
});

  });