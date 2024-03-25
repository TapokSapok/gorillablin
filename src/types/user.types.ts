import { ICashier } from './cashier.types';
import { ICoupon } from './coupon.types';

export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	cashierProfile?: ICashier;
	adminProfile?: IAdmin;
	createdAt: string;
	coupons: ICoupon[];
}

export interface IAdmin {
	id: number;
	user: IUser;
	userId: number;
}
