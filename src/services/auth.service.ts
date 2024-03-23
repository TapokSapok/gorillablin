'use client';
import { axiosClassic } from '@/api/interceptors';
import { ILoginForm, IRegisterForm } from '@/types/auth.types';
import { saveAccessToken } from './access-token.service';

class AuthService {
	async login(data: ILoginForm) {
		const response = await axiosClassic.post('auth/login', data);
		if (response.data.accessToken) saveAccessToken(response.data.accessToken);
		return response;
	}

	async register(data: IRegisterForm) {
		const response = await axiosClassic.post('auth/registration', data);
		if (response.data.accessToken) saveAccessToken(response.data.accessToken);
		return response;
	}
}

export const authService = new AuthService();
