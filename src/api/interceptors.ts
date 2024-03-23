import { getAccessToken } from '@/services/access-token.service';
import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4040/api',
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
	async error => {
		// throw error;
		// return error;
	}
);

export { axiosClassic, axiosWithAuth };
