'use client';
import { authService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import styles from './Auth.module.scss';
import { useContext, useState } from 'react';
import { ProfileContext } from '../providers';
import { IRegisterForm } from '@/types/auth.types';
import useRegister from './hooks/useRegister';

export default function RegisterForm() {
	const [showPass, setShowPass] = useState(false);
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterForm>({ mode: 'onChange' });

	const { mutate: reg, isPending, error } = useRegister(reset);
	const onSubmit: SubmitHandler<IRegisterForm> = data => reg(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={isPending ? { pointerEvents: 'none', opacity: '0.3' } : {}}>
			<div className={styles.field} data-inline>
				<div className={styles.label}>Имя</div>
				<div className={styles.input_wrapper}>
					<input type='text' {...register('firstName', { required: 'Поле обязательно!' })} />
				</div>
				{errors?.email?.message && <div className={styles.error_message}>{errors?.email?.message}</div>}
			</div>

			<div className={styles.field} data-inline>
				<div className={styles.label}>Фамилия</div>
				<div className={styles.input_wrapper}>
					<input type='text' {...register('lastName', { required: 'Поле обязательно!' })} />
				</div>
				{errors?.email?.message && <div className={styles.error_message}>{errors?.email?.message}</div>}
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Почта</div>
				<div className={styles.input_wrapper}>
					<input type='text' {...register('email', { required: 'Поле обязательно!' })} />
				</div>
				{errors?.email?.message && <div className={styles.error_message}>{errors?.email?.message}</div>}
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Пароль</div>
				<div className={styles.input_wrapper}>
					<input type={!showPass ? 'password' : 'text'} {...register('password', { required: 'Поле обязательно!', minLength: { message: 'Минимум 6 символов!', value: 6 } })} />
					{errors?.password?.message && <div className={styles.error_message}>{errors?.password?.message}</div>}
					<img src={showPass ? './eye.svg' : './eye-off.svg'} alt='' width={18} onClick={() => setShowPass(!showPass)} />
				</div>
			</div>
			<span className={styles.separator}></span>
			<button className={styles.submit_button} type='submit'>
				Регистрация
			</button>
			{/* @ts-ignore */}
			{error && <div className={styles.res_error}>{error?.response?.data?.message}</div>}
		</form>
	);
}
