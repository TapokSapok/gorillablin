"use client";
import styles from "./Shift.module.scss";
import PageTransition from "../transition";
import { useContext, useEffect, useState } from "react";
import { ProfileContext, SocketContext } from "../providers";
import OrderPanel from "@/components/shift/order-panel/OrderPanel";
import OrderListPanel from "@/components/shift/order-list-panel/OrderListPanel";
import StatisticsPanel from "@/components/shift/statistics-panel/StatisticsPanel";
import useActiveShift from "./hooks/useActiveShift";
import useStartShift from "./hooks/useStartShift";
import CouponPanel from "@/components/shift/coupon-panel/CouponPanel";
import { toast } from "sonner";
import { ICoupon } from "@/types/coupon.types";
import Panel from "@/components/ui/panel/Panel";

export default function Shift() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [shiftFetched, setShiftFetched] = useState(false);
  const { socket } = useContext(SocketContext);

  const { getActiveShift, isPending } = useActiveShift();
  const { mutate } = useStartShift();

  useEffect(() => {
    if (profile && !shiftFetched) {
      getActiveShift();
      setShiftFetched(true);
    }
  }, [profile]);

  useEffect(() => {
    if (!socket || !profile || !profile.cashierProfile?.activeShift?.coupons)
      return;
    socket.emit("start-shift");

    const usingCouponHandler = (coupon: ICoupon) => {
      toast.info("Кто-то использовал купон");
      setProfile({
        ...profile,
        cashierProfile: {
          ...profile?.cashierProfile,
          //@ts-ignore
          activeShift: {
            ...profile?.cashierProfile?.activeShift,
            coupons: [...profile!.cashierProfile!.activeShift!.coupons, coupon],
          },
        },
      });
    };

    socket.on("using-coupon", usingCouponHandler);

    return () => {
      socket.off("using-coupon", usingCouponHandler);
    };
  }, [socket, profile]);

  return (
    <PageTransition>
      {!profile?.cashierProfile?.activeShift && (
        <div className={styles.start_shift}>
          {!isPending && (
            <div className={styles.box}>
              <div className={styles.title}>Начать смену</div>
              <button
                className={styles.shift_button}
                onClick={() => {
                  if (socket) socket.emit("start-shift");
                  mutate();
                }}
              >
                Продолжить
              </button>
            </div>
          )}
        </div>
      )}
      <div className={styles.panels}>
        <div className={styles.side}>
          <Panel title="Сбор заказа" allowClosing={true}>
            <OrderPanel />
          </Panel>
        </div>
        <div className={styles.side}>
          <Panel title="Статистика" allowClosing={true}>
            <StatisticsPanel />
          </Panel>
          <Panel title="Купоны" allowClosing={true}>
            <CouponPanel />
          </Panel>
          <Panel title="Выполненые заказы" allowClosing={true}>
            <OrderListPanel />
          </Panel>
        </div>
      </div>
    </PageTransition>
  );
}
