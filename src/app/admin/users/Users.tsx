"use client";
import styles from "./Users.module.scss";
import { useEffect, useState } from "react";
import useGetUsers from "./hooks/useGetUsers";
import FiltersPanel from "@/components/admin/users/filters-panel/FiltersPanel";
import UsersPanel from "@/components/admin/users/users-panel/UsersPanel";

export interface IUserFilters {
  skip: number;
  take: number;
  firstName: string;
  lastName: string;
  adminProfile: boolean;
  cashierProfile: boolean;
}

export default function Users() {
  const [filters, setFilters] = useState<IUserFilters>({
    skip: 0,
    take: 10,
    firstName: "",
    lastName: "",
    cashierProfile: false,
    adminProfile: false,
  });
  const { data, isLoading, refetch } = useGetUsers(filters);

  return (
    <div className={styles.main}>
      <FiltersPanel filters={filters} setFilters={setFilters} />
      <UsersPanel users={data} />
    </div>
  );
}
