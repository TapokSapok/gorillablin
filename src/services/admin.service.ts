import { axiosWithAuth } from "@/api/interceptors";
import { IUserFilters } from "@/app/admin/users/Users";
import { IUser } from "@/types/user.types";

class AdminService {
  async getUsers(data: IUserFilters) {
    const response = await axiosWithAuth.post<IUser[]>("/admin/users", data);
    return response;
  }
}

export const adminService = new AdminService();
