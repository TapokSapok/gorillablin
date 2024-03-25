import { IUser } from './user.types';

export interface ICoupon {
	id: number;
	user: IUser;
	userId: number;
	status: CouponStatus;
	gives: string[];
	activatedTime: string;
	createdAt: string;
}

export enum CouponStatus {
	not_used = 'NOT_USED',
	using = 'USING',
	used = 'USED',
}

export interface ICouponHandler extends ICoupon {
	error?: string;
}
