require('dotenv').config();
const { Bot } = require('grammy');

const bot = new Bot(process.env.KEY);

bot.command('start', ctx => {
	ctx.reply(`Hello ${ctx.from.first_name}!`);
});

bot.on('message', ctx => {
	ctx.reply('You said: ' + ctx.message.text);
});

bot.start();
