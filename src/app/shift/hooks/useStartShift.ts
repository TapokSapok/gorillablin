import { ProfileContext } from '@/app/providers';
import { cashierService } from '@/services/cashier.service';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function useStartShift() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate } = useMutation({
		mutationKey: ['start-shift'],
		mutationFn: () => cashierService.startShift(),
		onSuccess: data => {
			if (data.data) {
				// @ts-ignore
				setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: data.data } });
				toast.success('Смена началась');
			}
		},
	});

	return { mutate };
}
