require('dotenv').config();
const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.KEY);

// show menu command  of users
bot.api.setMyCommands([
	{ command: 'start', description: 'Start the bot' },
	{ command: 'help', description: 'Show help message' }
]);

// example mesage filter to id users
bot.on('msg').filter(
	ctx => {
		//  paste your user id
		return ctx.from.id == process.env.USER_ID;
	},
	async ctx => {
		await ctx.reply('You are authorized to use this bot.');
	}
);

// dont used camalCase because it call error, please use snake_case
bot.command('start', ctx => {
	ctx.reply(`Hello ${ctx.from.first_name}!`);
});

bot.command('help', ctx => {
	ctx.reply('This is a help message.');
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
