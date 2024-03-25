import { ProfileContext } from '@/app/providers';
import { couponService } from '@/services/coupon.service';
import { ICoupon } from '@/types/coupon.types';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function useSubmitCoupon() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate, isPending } = useMutation({
		mutationKey: ['submit-coupon'],
		mutationFn: (couponId: number) => couponService.submitCoupon(couponId),
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
	return { mutate, isPending };
}
