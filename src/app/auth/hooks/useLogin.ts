import { ProfileContext } from '@/app/providers';
import { authService } from '@/services/auth.service';
import { ILoginForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UseFormReset } from 'react-hook-form';
import { toast } from 'sonner';

export default function useLogin(reset: UseFormReset<ILoginForm>) {
	const { setProfile } = useContext(ProfileContext);
	const { push } = useRouter();

	const {
		mutate: login,
		error,
		isPending,
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginForm) => authService.login(data),
		onSuccess(data) {
			setProfile(data.data.user);
			toast.success('Успешная авторизация!');
			reset();
			push('/');
		},
	});

	return { login, error, isPending };
}
