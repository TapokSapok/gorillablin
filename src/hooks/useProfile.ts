import { ProfileContext } from "@/app/providers";
import { getAccessToken } from "@/services/access-token.service";
import { userService } from "@/services/user.service";
import { IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function useProfile() {
  const { setProfile } = useContext(ProfileContext);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  useEffect(() => setProfile(data || null), [data]);
  return { isLoading };
}
