import { ICoupon } from './coupon.types';
import { IUser } from './user.types';

export interface ICashier {
	id: number;
	userId: number;
	shifts: IShift[];
	activeShift: IActiveShift | null;
	totalRevenue: number;
	totalOrderCount: number;
}

export interface IShift {
	id: number;
	cashierId: number;
	startTime: string;
	endTime: string;
	revenue: number;
	orderCount: number;
	orders: IOrder[];
}

export interface IActiveShift extends IShift {
	coupons: ICoupon[];
}

export interface IOrder {
	id: number;
	shiftId: number;
	products: string[];
	amount: number;
	createdAt: string;
}

export interface ICreateOrder {
	shiftId: number;
	products: string[];
}
