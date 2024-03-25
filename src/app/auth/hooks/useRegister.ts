import { ProfileContext } from '@/app/providers';
import { authService } from '@/services/auth.service';
import { ILoginForm, IRegisterForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UseFormReset } from 'react-hook-form';
import { toast } from 'sonner';

export default function useRegister(reset: UseFormReset<IRegisterForm>) {
	const { push } = useRouter();
	const { setProfile } = useContext(ProfileContext);

	const { mutate, error, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterForm) => authService.register(data),
		onSuccess(data) {
			setProfile(data.data.user);
			toast.success('Успешная регистрация!');
			reset();
			push('/');
		},
	});
	return { mutate, error, isPending };
}
