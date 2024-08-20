require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');

const bot = new Bot(process.env.KEY);

// show menu command  of users
bot.api.setMyCommands([
	{ command: 'start', description: 'Start the bot' },
	{ command: 'help', description: 'Show help message' },
	{ command: 'mood', description: 'bot ask how you are in the mood' }
]);

// example mesage filter to id users
// bot.on('msg').filter(
// 	ctx => {
// 		//  paste your user id
// 		return ctx.from.id == process.env.USER_ID;
// 	},
// 	async ctx => {
// 		await ctx.reply('You are authorized to use this bot.');
// 	}
// );

// dont used camalCase because it call error, please use snake_case
bot.command('start', async ctx => {
	await ctx.react('🔥');
	await ctx.reply(
		`Hello ${ctx.from.first_name}! Github author bot <a href="https://github.com/Immeo"><span class="tg-spoiler">link</span></a>`,
		{ parse_mode: 'HTML', disable_web_page_preview: true }
	);
});

bot.hears('ID', async ctx => {
	await ctx.reply(`You id: ${ctx.from.id}`);
});

// example of hears  spetific text
bot.hears('ping', async ctx => {
	await ctx.reply('pong');
});

// example antispam hears
bot.hears(/fuck/, async ctx => [
	await ctx.reply('You say ban word'),
	await ctx.deleteMessage()
]);

bot.command('mood', async ctx => {
	const kb = new Keyboard()
		.text('good')
		.row()
		.text('okay')
		.row()
		.text('bad')
		.resized();
	await ctx.reply('how is your mood?', { reply_markup: kb });
});

bot.hears(['good', 'okay', 'bad'], async ctx => {
	await ctx.reply('wow', {
		reply_markup: { remove_keyboard: true }
	});
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
