import { BACK_URL } from '@/config';
import { getAccessToken, removeAccessToken } from '@/services/access-token.service';
import axios, { AxiosError, type CreateAxiosDefaults } from 'axios';
import { useRouter } from 'next/navigation';

const options: CreateAxiosDefaults = {
	baseURL: BACK_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken();
	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async (error: AxiosError) => {
		if (error?.response?.status === 401 && error.config) {
			removeAccessToken();
		}
		throw error;
	}
);

export { axiosClassic, axiosWithAuth };
