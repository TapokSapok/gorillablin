import { ProfileContext } from '@/app/providers';
import { couponService } from '@/services/coupon.service';
import { ICoupon } from '@/types/coupon.types';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function useRejectCoupon() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate } = useMutation({
		mutationKey: ['reject-coupon'],
		mutationFn: (couponId: number) => couponService.rejectCoupon(couponId),
		onSuccess: (coupon: ICoupon) => {
			setProfile({
				...profile,
				cashierProfile: {
					...profile?.cashierProfile,
					//@ts-ignore
					activeShift: { ...profile?.cashierProfile?.activeShift, coupons: profile!.cashierProfile!.activeShift!.coupons.filter(c => c.id !== coupon.id) },
				},
			});
		},
	});
	return { mutate };
}
