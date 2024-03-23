const mineflayer = require('mineflayer');
const sqlite3 = require('sqlite3').verbose();
const prismarineEntity = require('prismarine-entity');

prismarineEntity.printObjectTypeWarning = () => {};
prismarineEntity.printMobTypeWarning = () => {};

const runningBots = {};

const db = new sqlite3.Database('./bot_database.db', err => {
	if (err) {
		console.error('Ошибка при подключении к базе данных:', err.message);
	} else {
		console.log('Успешное подключение к базе данных \n');
		startBotManagement();
	}
});

function startBotManagement() {
	setInterval(() => {
		db.all("SELECT * FROM bots WHERE ON_OFF = 'ON'", (err, rows) => {
			if (err) {
				console.error('Ошибка при выполнении запроса к базе данных:', err.message);
			} else {
				rows.forEach(row => {
					const { NickName, IPserver, PORTserver, PIP, PPORT } = row;
					startBot(NickName, IPserver, PORTserver, PIP, PPORT);
				});
			}
		});

		db.all("SELECT * FROM bots WHERE ON_OFF = 'OFF'", (err, rows) => {
			if (err) {
				console.error('Ошибка при выполнении запроса к базе данных:', err.message);
			} else {
				rows.forEach(row => {
					const { NickName } = row;
					if (isBotRunning(NickName)) {
						stopBot(NickName);
					}
				});
			}
		});
	}, 1000);
}

function isBotRunning(NickName) {
	return !!runningBots[NickName];
}

function startBot(NickName, IPserver, PORTserver, PIP, PPORT) {
	const options = {
		host: IPserver,
		port: PORTserver,
		username: NickName,
	};

	const bot = mineflayer.createBot(options);

	bot.once('spawn', () => {
		setTimeout(() => {
			bot.chat('/reg MineBoost MineBoost');
			setTimeout(() => {
				bot.chat('/login MineBoost');
			}, 2000);
		}, 1000);
	});

	bot.on('kicked', reason => {
		console.log(`Бот ${NickName} был кикнут. Причина: ${reason}`);
		setTimeout(() => {
			startBot(NickName, IPserver, PORTserver, PIP, PPORT);
		}, 20000);
	});

	bot.on('error', err => {
		console.error(`Ошибка при подключении бота ${NickName}:`, err);
		console.log(`Повторное подключение бота ${NickName}...`);
		if (err.code === 'EPIPE') {
			// В случае ошибки EPIPE (разрыв соединения), перезапустить бота
			setTimeout(() => {
				startBot(NickName, IPserver, PORTserver, PIP, PPORT);
			}, 20000);
		} else {
			// В остальных случаях, просто вывести сообщение об ошибке
			console.error(`Ошибка при подключении бота ${NickName}:`, err);
			restartBot(NickName);
		}
	});

	bot.on('end', () => {
		delete runningBots[NickName];
		console.log(`Бот ${NickName} был отключен`);
	});

	runningBots[NickName] = bot;
}

function restartBot(NickName, IPserver, PORTserver, PIP, PPORT) {
	if (isBotRunning(NickName)) {
		const bot = runningBots[NickName];
		bot.end();
		delete runningBots[NickName];
		startBot(NickName, IPserver, PORTserver, PIP, PPORT); // Передаем переменные IPserver, PORTserver, PIP, PPORT
		console.log(`Бот с именем ${NickName} перезапущен`);
	}
}

function stopBot(NickName) {
	if (isBotRunning(NickName)) {
		const bot = runningBots[NickName];
		bot.end();
		delete runningBots[NickName];
		console.log(`Бот с именем ${NickName} выключен`);
	} else {
		console.log(`Бот с именем ${NickName} не запущен`);
	}
}
