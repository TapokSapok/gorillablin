import { ICoupon } from "@/types/coupon.types";
import styles from "./CouponItem.module.scss";
import { Loader } from "@/components/ui/loader/Loader";
import { couponPositionsType } from "../CouponMenu";
import useCoupon from "@/hooks/useCoupon";

export default function CouponItem({
  coupon,
  positions,
}: {
  coupon: ICoupon;
  positions: couponPositionsType;
}) {
  const { mutate: activateCoupon, isPending } = useCoupon();

  return (
    <div className={styles.coupon} data-used={coupon.status === "USED"}>
      {isPending ||
        (coupon.status === "USING" && (
          <div className={styles.loader}>
            <Loader width={80} />
          </div>
        ))}
      {coupon.status === "USING" && (
        <div className={styles.using_message}>Купон на проверке</div>
      )}
      <div className={styles.coupon_title}>КУПОН</div>
      {Object.entries(positions).map(
        (p, i2) =>
          Number(p[0]) === coupon.id && (
            <div className={styles.positions} key={i2}>
              <div className={styles.pos_title}>
                {coupon.status === "NOT_USED" || coupon.status === "USING"
                  ? "Вы получите:"
                  : "Вы получили:"}
              </div>
              {Object.entries(p[1]).map((product, i3) => (
                <div className={styles.position} key={i3}>
                  {product[0]} <span>x</span>
                  {product[1]}
                </div>
              ))}
            </div>
          ),
      )}
      {coupon.status === "NOT_USED" || coupon.status === "USING" ? (
        <>
          <button
            className={styles.use_button}
            onClick={() => activateCoupon(coupon.id)}
          >
            Использовать
          </button>
          <div className={styles.desc}>
            Пожалуйста, используйте купон у кассы!
          </div>
        </>
      ) : (
        <div className={styles.used}>Купон использован</div>
      )}
    </div>
  );
}
