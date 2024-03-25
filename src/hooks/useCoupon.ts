import { ProfileContext } from '@/app/providers';
import { couponService } from '@/services/coupon.service';
import { ICoupon, ICouponHandler } from '@/types/coupon.types';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function useCoupon() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate, isPending } = useMutation({
		mutationKey: ['use-coupon'],
		mutationFn: (couponId: number) => couponService.useCoupon(couponId),
		onSuccess: (coupon: ICouponHandler) => {
			if (coupon.error) return toast.error(coupon.error);
			//@ts-ignore
			setProfile({ ...profile, coupons: profile!.coupons!.map(c => (c.id === coupon.id ? coupon : c)) });
		},
	});
	return { mutate, isPending };
}
