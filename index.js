require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.KEY);

bot.command('start', ctx => {
	ctx.reply(`Hello ${ctx.from.first_name}!`);
});

bot.on('message', ctx => {
	ctx.reply('You said: ' + ctx.message.text);
});

bot.catch(err => {
	const ctx = err.ctx;
	console.error(`Error while handling update ${ctx.update.update_id}:`);
	const e = err.error;
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description);
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e);
	} else {
		console.error('Unknown error:', e);
	}
});

bot.start();
