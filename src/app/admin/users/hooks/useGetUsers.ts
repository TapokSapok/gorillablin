import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";
import { IUserFilters } from "../Users";

export default function useGetUsers(filter: IUserFilters) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: () => adminService.getUsers(filter).then((res) => res.data),
    enabled: !!filter,
  });
  return { data, refetch, isLoading };
}
