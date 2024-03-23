import { IUser } from './user.types';

export interface ICashier {
	id: number;
	user: IUser;
	userId: number;
	shifts: IShift[];
	activeShift?: IShift | null;
	totalRevenue: number;
	totalOrderCount: number;
}

export interface IShift {
	id: number;
	cashier?: ICashier | null;
	cashierId: number;
	startTime: string;
	endTime: string;
	revenue: number;
	orderCount: number;
	orders: IOrder[];
}

export interface IOrder {
	id: number;
	shiftId: number;
	shift?: IShift;
	products: string[];
	amount: number;
	createdAt: string;
}

export interface ICreateOrder {
	shiftId: number;
	products: string[];
}
