'use client';
import Cookie from 'js-cookie';

export const getAccessToken = () => {
	const accessToken = Cookie.get('accessToken');
	return accessToken || null;
};

export const saveAccessToken = (token: string) => {
	Cookie.set('accessToken', token);
};

export const removeAccessToken = () => {
	Cookie.remove('accessToken');
};
