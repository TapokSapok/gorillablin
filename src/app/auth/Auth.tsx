'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ILoginForm, IRegisterForm } from '@/types/auth.types';
import { authService } from '@/services/auth.service';
import { PAGES } from '@/config';
import { toast } from 'sonner';
import { Input } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import Field from '@/components/ui/field/Field';
import RegisterForm from './RegisterForm';
import Snowfall from 'react-snowfall';
import PageTransition from '../transition';

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<PageTransition>
			<div className={styles.panel}>
				<div className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</div>
				<div className={styles.body}>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
				<a className={styles.method} onClick={() => setIsLogin(!isLogin)}>
					{isLogin ? 'Зарегистрироваться' : 'Авторизироваться'}
				</a>
			</div>
		</PageTransition>
	);
}
