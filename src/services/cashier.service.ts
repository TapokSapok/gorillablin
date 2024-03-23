import { axiosWithAuth } from '@/api/interceptors';
import { ICashier, ICreateOrder, IShift } from '@/types/cashier.types';

class CashierService {
	async activeShift() {
		const response = await axiosWithAuth.post<IShift>('/shift/active');
		return response;
	}

	async startShift() {
		const response = await axiosWithAuth.post<IShift>('/shift/start');
		return response;
	}

	async endShift() {
		const response = await axiosWithAuth.post<IShift>('/shift/end');
		return response;
	}

	async createOrder(data: ICreateOrder) {
		const response = await axiosWithAuth.post('/order/create', data);
		return response;
	}
}

export const cashierService = new CashierService();
