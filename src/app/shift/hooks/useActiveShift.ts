import { ProfileContext } from '@/app/providers';
import { cashierService } from '@/services/cashier.service';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

export default function useActiveShift() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate: getActiveShift, isPending } = useMutation({
		mutationKey: ['shift'],
		mutationFn: () => cashierService.activeShift(),
		onSuccess: data => {
			if (data.data) {
				// @ts-ignore
				setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: data.data } });
			}
		},
	});
	return { getActiveShift, isPending };
}
