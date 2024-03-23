import { axiosWithAuth } from '@/api/interceptors';
import { IUser } from '@/types/user.types';

class UserService {
	async getProfile() {
		const response = await axiosWithAuth.get<IUser>('/auth/profile');
		return response.data;
	}
}

export const userService = new UserService();
