import { ICashier } from './cashier.types';

export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	cashierProfile?: ICashier;
	adminProfile?: IAdmin;
	createdAt: string;
	coupones?: ICoupone[];
}

export interface IProfileContext {
	profile: IUser | null;
	setProfile: (v: IUser | null) => void;
}

export interface ICoupone {
	id: number;
	user: IUser;
	userId: number;
	status: CouponeStatus;
	gives: string[];
	activatedTime: string;
	createdAt: string;
}

export enum CouponeStatus {
	not_used = 'NOT_USED',
	using = 'USING',
	used = 'USED',
}

export interface IAdmin {
	id: number;
	user: IUser;
	userId: number;
}
