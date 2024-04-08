import { ProfileContext } from "@/app/providers";
import { cashierService } from "@/services/cashier.service";
import { ICreateOrder } from "@/types/cashier.types";
import { IUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

export default function useCreateOrder(setCart: (v: any[]) => void) {
  const { profile, setProfile } = useContext(ProfileContext);

  const { mutate } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: (data: ICreateOrder | any) => cashierService.createOrder(data),
    onSuccess: (res) => {
      toast.success("Заказ собран!");
      setCart([]);
      setProfile({
        ...profile,
        cashierProfile: {
          ...profile?.cashierProfile,
          // @ts-ignore
          activeShift: {
            ...profile!.cashierProfile!.activeShift,
            orders: [
              ...profile!.cashierProfile!.activeShift!.orders,
              res.data.order,
            ],
            orderCount: res.data.shift.orderCount,
            revenue: res.data.shift.revenue,
          },
          totalOrderCount: res.data.cashier.totalOrderCount,
          totalRevenue: res.data.cashier.totalRevenue,
        },
      });
    },
  });
  return { mutate };
}
