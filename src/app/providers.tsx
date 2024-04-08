"use client";

import LoadingScreen from "@/components/layout/loading-screen/LoadingScreen";
import { BACK_URL, SOCKET_URL } from "@/config";
import { getAccessToken } from "@/services/access-token.service";
import { userService } from "@/services/user.service";
import { ICoupon } from "@/types/coupon.types";
import { IUser } from "@/types/user.types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

export interface ISocketContext {
  socket: Socket | null;
  setSocket: (v: Socket | null) => void;
}
export interface IProfileContext {
  profile: IUser | null;
  setProfile: (v: IUser | null) => void;
}

export const ProfileContext = createContext<IProfileContext>({
  profile: null,
  setProfile: () => {},
});
export const SocketContext = createContext<ISocketContext>({
  socket: null,
  setSocket: () => {},
});

export function Providers({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket && profile) {
      setSocket(
        io(SOCKET_URL, {
          extraHeaders: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }),
      );
    }
    if (!socket || !profile?.coupons) return;

    const rejectCouponHandler = (coupon: ICoupon) => {
      toast.error("Купон был отклонён!");
      setProfile({
        ...profile,
        coupons: [
          ...profile?.coupons?.map((c) => (c.id === coupon.id ? coupon : c)),
        ],
      });
    };

    const submitCouponHandler = (coupon: ICoupon) => {
      toast.success("Купон успешно принят!");
      setProfile({
        ...profile,
        coupons: [
          ...profile?.coupons?.map((c) => (c.id === coupon.id ? coupon : c)),
        ],
      });
    };

    socket.on("submit-coupon", submitCouponHandler);
    socket.on("reject-coupon", rejectCouponHandler);
    return () => {
      socket?.off("submit-coupon", submitCouponHandler);
      socket?.off("reject-coupon", rejectCouponHandler);
    };
  }, [socket, profile]);

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={client}>
      <SocketContext.Provider value={{ socket, setSocket }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <LoadingScreen>{children}</LoadingScreen>
        </ProfileContext.Provider>
      </SocketContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
