import { axiosWithAuth } from '@/api/interceptors';

class CouponService {
	async useCoupon(couponId: number) {
		const response = await axiosWithAuth.post('coupon/use', { couponId });
		return response.data;
	}
	async submitCoupon(couponId: number) {
		const response = await axiosWithAuth.post('coupon/submit', { couponId });
		return response.data;
	}
	async rejectCoupon(couponId: number) {
		const response = await axiosWithAuth.post('coupon/reject', { couponId });
		return response.data;
	}
}

export const couponService = new CouponService();
