import { ProfileContext } from '@/app/providers';
import { cashierService } from '@/services/cashier.service';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export default function useEndShift() {
	const { profile, setProfile } = useContext(ProfileContext);

	const { mutate } = useMutation({
		mutationKey: ['end-shift'],
		mutationFn: () => cashierService.endShift(),
		onSuccess: () => {
			//@ts-ignore
			setProfile({ ...profile, cashierProfile: { ...profile?.cashierProfile, activeShift: null } });
			toast.success('Смена закрыта');
		},
	});

	return { mutate };
}
