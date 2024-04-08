import { LegacyRef, Ref, useContext, useEffect, useRef, useState } from "react";
import styles from "./CouponMenu.module.scss";
import { motion } from "framer-motion";
import { ProfileContext } from "@/app/providers";
import useCoupon from "@/hooks/useCoupon";
import CouponItem from "./coupon-item/CouponItem";

export type couponPositionsType = {
  [key: number]: { [value: string]: number };
};

export default function CouponMenu({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: (v: boolean) => void;
}) {
  const { profile } = useContext(ProfileContext);
  const [positions, setPositions] = useState<couponPositionsType>({
    13: { Блины: 2 },
  });
  const menuRef = useRef<null | HTMLDivElement>(null);

  const { mutate: activateCoupon, isPending } = useCoupon();

  useEffect(() => {
    if (!profile?.coupons) return;
    let counter: any = {};
    for (const coupon of profile?.coupons) {
      if (!counter[coupon.id]) counter[coupon.id] = {};
      for (const pos of coupon.gives) {
        if (!counter[coupon.id][pos]) counter[coupon.id][pos] = 1;
        else counter[coupon.id][pos] += 1;
      }
    }
    setPositions(counter);
  }, [profile?.coupons]);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => removeEventListener("mousedown", clickHandler);
  }, []);

  return (
    <motion.div //
      initial={{ x: 360 }}
      animate={{ x: 0 }}
      exit={{ x: 360 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      className={styles.menu}
      ref={menuRef}
      style={!isActive ? { display: "none" } : {}}
    >
      <div className={styles.header}>
        Ваши купоны{" "}
        <img onClick={() => setIsActive(false)} src="/x.svg" width={30}></img>
      </div>

      <div className={styles.coupons}>
        {profile?.coupons
          ?.toReversed()
          .map((cp, i) => (
            <CouponItem key={i} coupon={cp} positions={positions} />
          ))}
      </div>
    </motion.div>
  );
}
