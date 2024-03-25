'use client';

import { ILoginForm } from '@/types/auth.types';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import styles from './Auth.module.scss';
import { useContext, useState } from 'react';
import { ProfileContext } from '../providers';
import useLogin from './hooks/useLogin';

export default function LoginForm() {
	const [showPass, setShowPass] = useState(false);
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({ mode: 'onChange' });
	const { login, error, isPending } = useLogin(reset);
	const onSubmit: SubmitHandler<ILoginForm> = data => login(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={isPending ? { pointerEvents: 'none', opacity: '0.3' } : {}}>
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
				Авторизоваться
			</button>
			{/* @ts-ignore */}
			{error && <div className={styles.res_error}>{error?.response?.data?.message}</div>}
		</form>
	);
}
