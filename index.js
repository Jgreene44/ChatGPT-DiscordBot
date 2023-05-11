require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var prompt = "";

client.on("ready", () => {
  client.user.setActivity('with my balls!');
  console.log("Activity Set / Client Ready");
});

client.on("messageCreate", function(message) {
   if (message.author.bot) return;
   if(message.channelId != '1052347136840310854') return;
   prompt = `You: ${message.content}\n`;
   (async () => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
      console.log("Bot Reply: " + `${response.data.choices[0].text}`);
      //console.log("prompt: " + `${response.data.choices[0].text}\n`)
      message.reply(`${response.data.choices[0].text}`);
         //prompt += `${response.data.choices[0].text}\n`;
     })();                         

});                               
client.login(process.env.BOT_TOKEN);
