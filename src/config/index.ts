export const PAGES = {
	CASHIER: '/shift',
	AUTH: '/auth',
	MAIN: '/',
	ADMIN: '/admin',
};

export const PRODUCTS = [
	{
		title: 'Блин обычный',
		price: 50,
		img: '/products/pancake-default.jpg',
		type: 'pancake',
	},
	{
		title: 'Блин с ветчиной и сыром',
		price: 70,
		img: '/products/pancake-vis.jpg',
		type: 'pancake',
	},
	{
		title: 'Блин с творогом',
		price: 70,
		img: '/products/pancake-tvorog.jpg',
		type: 'pancake',
	},
	{
		title: 'Блин с бананом и шоколадом',
		price: 70,
		img: '/products/pancake-bis.jpg',
		type: 'pancake',
	},

	{
		title: 'Варенье',
		price: 20,
		img: '/products/varenie.jpeg',
		type: 'addition',
	},
	{
		title: 'Шоколадный топинг',
		price: 20,
		img: '/products/toping-sh.jpeg',
		type: 'addition',
	},
	{
		title: 'Растопленый шоколад',
		price: 35,
		img: '/products/shokolad-top.jpg',
		type: 'addition',
	},
	{
		title: 'Сметана',
		price: 20,
		img: '/products/smetana.jpeg',
		type: 'addition',
	},
	{
		title: 'Сгущенка',
		price: 20,
		img: '/products/sgushenka.jpg',
		type: 'addition',
	},
];

export const ADMIN_SIDEBAR = [
	{
		img: '/users.svg',
		title: 'Пользователи',
		route: '/users',
	},
	{
		img: '/chart.svg',
		title: 'Статистика',
		route: '/statistics',
	},
	{
		img: '/drumstick.svg',
		title: 'Кассиры',
		route: '/cashiers',
	},
];
